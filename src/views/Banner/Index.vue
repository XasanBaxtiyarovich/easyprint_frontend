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
                        <router-link to="/banner/create" class="btn btn-primary">
                            <span class="fa-solid fa-sheet-plastic"></span>
                            
                            &nbsp;
                            
                            <span class="fa fa-plus"></span>
                        </router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ $t('banner.title_baner') }}</th>
                                        <th>{{ $t('banner.main') }}</th>
                                        <th>{{ $t('banner.carousel') }}</th>
                                        <th>{{ $t('banner.description_baner') }}</th>
                                        <th>{{ $t('banner.status') }}</th>
                                        <th>{{ $t('company.function') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="banner in banners" :key="banner.id" class="products_url" @click="pushInShowPage(banner.id)">
                                        <td>
                                            <span class="fw-medium">{{ banner.title }}</span>
                                        </td>        
                                        <td>
                                            <img width="30px" :src="banner.images[0].banner">
                                        </td>
                                        <td class="d-flex">
                                            <div class="me-2" v-for="image in banner.images[1].carousel">
                                                <img width="30px" :src="image">
                                            </div>
                                        </td>            
                                        <td>
                                            <span class="fw-medium">{{ banner.text }}</span>
                                        </td>  
                                        <td>
                                            <span v-if="banner.is_active == 1" class="badge bg-label-success me-1">Active</span>
                                            <span v-else-if="banner.is_active == 0" class="badge bg-label-danger me-1">Not Active</span>
                                        </td>      
                                        <td>
                                            <router-link :to="'/banner/edit/'+banner.id" class="ms-3"><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(banner.id)"><i class="fa fa-trash"></i></a>
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
            banners: [],
            banner_id: null,
            delete_modal: false,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async pushInShowPage(id) {
            this.$router.push(`/banner/show/${id}`)
        },

        async getBanners () {
            try {
                const res = await axios.get('http://localhost:8000/api/banner/findAll');
                
                this.banners = res.data.parsedBanners;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(`http://localhost:8000/api/banner/delete/${this.banner_id}`);

                if (res.data == 200) this.$toast.success(this.$t('toast.banner.deleted'));

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
            this.banner_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getBanners();
    }
}
</script>

<style>
.products_url {
    transition: 0.5s;
}

.products_url:hover {
    background-color: rgb(0, 0, 0, 0.1);
}
</style>