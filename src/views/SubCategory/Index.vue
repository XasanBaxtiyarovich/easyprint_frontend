<template>
    <div v-if="delete_modal" class="background-transparent" @click="closeModal" style="position: absolute; background-color: rgb(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 20;"></div>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <layout-menu/>
            <div v-if="MobileMenu">
                <layout-menu-mobile :closeSideBar="closeSideBar"></layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div v-if="delete_modal" style="width: 80%; display: flex; justify-content: center; position: absolute; margin-top: 16%;">
                    <div class="card" style="width: 320px; z-index: 21;">
                        <div class="card-body">
                            <div style="display: flex; justify-content: center;">
                                <span style="margin-bottom: 20px;">{{ $t('delete.remove') }}</span>
                            </div>
                            <div style="display: flex; justify-content: space-around;">
                                <button @click="deleteFunc" class="btn btn-danger">{{ $t('delete.yes') }}</button>
                                <button @click="closeModal" class="btn btn-warning">{{ $t('delete.no') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="display: flex; justify-content: end; width: 100%;">
                        <router-link to="/sub-category/create" class="btn btn-primary">
                            <span class="fa fa-list-alt"></span>
                            
                            &nbsp;
                            
                            <span class="fa fa-plus"></span>
                        </router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ this.$t('category.name') }}</th>
                                        <th>Parent category name</th>
                                        <th>{{ this.$t('category.created_at') }}</th>
                                        <th>{{ this.$t('category.updated_at') }}</th>
                                        <th>{{ this.$t('category.functions') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="category in categories" :key="category.id">
                                        <td>
                                            <span class="fw-medium">{{ category.name }}</span>
                                        </td>
                                        <td>
                                            <span class="fw-medium">{{ category.parent.name }}</span>
                                        </td>
                                        <td>
                                            <span>{{ category.created_at.split('T')[0] }}</span>
                                        </td>
                                        <td>
                                            <span>{{ category.updated_at.split('T')[0] }}</span>
                                        </td>
                                        <td>
                                            <router-link :to="'/sub-category/edit/'+category.id" class="ms-3"><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(category.id)"><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            categories: [],
            category_id: null,
            delete_modal: false,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getCategories () {
            try {
                const res = await axios.get('http://localhost:8000/api/category/findAllSubCategory');
                
                this.categories = res.data.categories;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(`http://localhost:8000/api/category/remove/${this.category_id}`);

                if (res.data == 200) this.$toast.success(this.$t('toast.category.deleted'));

                if (res.data != 200) this.$toast.error('Internal server error');

                setTimeout(() => {
                        location.reload();
                }, 1000 );
            } catch (error) {
                if (error.response.data.message) this.$toast.error('Internal server error');

                console.log(error);
            }
        },

        deleteModal (id) {
            this.category_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },
        
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCategories();
    }
}
</script>