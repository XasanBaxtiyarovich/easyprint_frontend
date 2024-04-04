<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <layout-menu/>
            <div v-if="MobileMenu">
                <layout-menu-mobile :closeSideBar="closeSideBar"></layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container" style="margin-top: 100px; padding: 0px 75px;">
                    <div class="col-xl">
                        <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">{{ this.$t('sub_category.create') }}</h5>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div style="display: flex;">
                                        <div class="mb-3" style="width: 49%;">
                                            <label class="form-label" for="country">{{ this.$t('sub_category.name') }}</label>
                                            <select v-model="name" class="select2 form-select">
                                                <option v-for="sub_category in sub_categories" :key="sub_category.id" :value="sub_category.name">{{ sub_category.name }}</option>
                                            </select>
                                        </div>  
                                        <div class="mb-3" style="width: 49%; margin-left: 30px;">
                                            <label class="form-label" for="country">{{ this.$t('sub_category.parent') }}</label>
                                            <select v-model="parent_id" class="select2 form-select">
                                                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <button @click="subCategoryCreate" class="btn btn-primary">{{ this.$t('create.create') }}</button>
                                        <button @click="cancelFunc" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ this.$t('edit.cancle_btn') }}</button>
                                    </div>
                                </form>
                            </div>
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
            name: "",
            categories: [],
            parent_id: null,
            sub_categories: [
                {id: 3, name: 'Men'},
                {id: 2, name: 'Women'},
                {id: 1, name: 'Unisex'},
                {id: 4, name: 'Children'}
            ]
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getCategories () {
            try {
                const res = await axios.get('http://localhost:8000/api/category/findAllCategory');

                this.categories = res.data.categories; 
            } catch (error) {
                console.log(error);
            }
        },

        async subCategoryCreate (e) {
            e.preventDefault();

            try {
                const res = await axios.post('http://localhost:8000/api/category/add-sub',
                {
                    name: this.name,
                    parent_id: this.parent_id
                });

                if (res.data.status == 201) {
                    this.$toast.success(this.$t('toast.category.created'));
                    setTimeout(() => {
                        this.$router.push('/sub-category/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error(this.$t('toast.sub_category.name_already'))
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                if (error.response.data.message) this.$toast.error(this.$t('toast.category.name_validate'));

                console.log(error.response.data.message[0]);
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/sub-category/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },
    mounted () {
        this.getCategories();
    }
}
</script>