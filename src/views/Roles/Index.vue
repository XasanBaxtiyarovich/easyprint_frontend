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
                        <router-link to="/role/create" class="btn btn-primary">
                            <span class="fa fa-user-tie"></span>
                            
                            &nbsp;
                            
                            <span class="fa fa-plus"></span>
                        </router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ $t('role.name') }}</th>
                                        <th>{{ $t('role.date') }}</th>
                                        <th>{{ $t('category.updated_at') }}</th>
                                        <th>{{ $t('role.function') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="role in roles" :key="role.id">
                                        <td>
                                            <span class="fw-medium">{{ role.name }}</span>
                                        </td>
                                        <td>
                                            <span>{{ role.created_at.split('T')[0] }}</span>
                                        </td>
                                        <td>
                                            <span>{{ role.updated_at.split('T')[0] }}</span>
                                        </td>
                                        <td>
                                            <router-link :to="'/role/edit/'+role.id" class="ms-3"><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(role.id)"><i class="fa fa-trash"></i></a>
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
            roles: [],
            role_id: null,
            delete_modal: false,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getRoles () {
            try {
                const res = await axios.get('http://localhost:8000/api/role/findAll');
                
                this.roles = res.data.roles;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(`http://localhost:8000/api/role/delete/${this.role_id}`);

                if (res.data == 200) this.$toast.success(this.$t('toast.role.deleted'));

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
            this.role_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getRoles();
    }
}
</script>