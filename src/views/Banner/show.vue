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
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="display: flex; justify-content: end; width: 100%;">
                        <router-link to="/banner/index" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive" style="overflow: hidden;">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th style="font-size: 20px;">{{ this.$t('product.attributes') }}</th>
                                        <th style="font-size: 20px;">{{ this.$t('product.informations') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0" >
                                    <tr>
                                        <th>{{ $t('banner.title_baner') }}:</th>
                                        <td>{{ banner.title }}</td>
                                    </tr>   
                                    <tr v-if="Object.keys(banner).length >0">
                                        <th>{{ $t('banner.main') }}:</th>
                                        <img width="200px" :src="this.banner.images[0].banner">
                                    </tr>
                                    <tr>
                                        <th>{{ $t('banner.carousel') }}:</th>
                                        <td class="row" v-if="Object.keys(banner).length >0">
                                            <div class="me-2 col-lg-3 col-md-4 col-sm-6" v-for="image in banner.images[1].carousel">
                                                <img class="img-fluid" width="150px" height="150px" :src="image">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{{ $t('banner.description_baner') }}:</th>
                                        <td>{{ this.banner.text }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ $t('banner.status') }}:</th>
                                        <span v-if="banner.is_active == true" class="badge bg-label-success me-1">Active</span>
                                        <span v-else-if="banner.is_active == false" class="badge bg-label-danger me-1">Not Active</span>
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
import { mapMutations, mapGetters } from 'vuex';

export default {
    data () {
        const router = this.$router;

        return {
            banner: {},
            delete_modal: false,
            banner_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getBanner() {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+`/banner/find/${this.banner_id}`);
                this.banner = res.data.parsedBanners[0];
            } catch (error) {
                console.error('Error while fetching banner:', error);
                // Handle error gracefully, such as displaying a message to the user
                // For example: this.$toast.error('An error occurred while fetching the banner');
            }
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getBanner();
    }
}
</script>