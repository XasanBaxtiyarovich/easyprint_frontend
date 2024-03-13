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
                        <router-link to="/size/index" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
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
                                        <th>{{ this.$t('size.name') }}:</th>
                                        <td>{{ this.size.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('size.category') }}:</th>
                                        <td>{{ this.type_name }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('size.status') }}:</th>
                                        <span v-if="size.status == 1" class="badge bg-label-success me-1">Active</span>
                                        <span v-else-if="size.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('size.created_at') }}:</th>
                                        <td>{{ this.size.created_at }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('size.updated_at') }}:</th>
                                        <td>{{ this.size.updated_at }}</td>
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
import router from '@/router';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            size: {},
            type_name: "",
            delete_modal: false,
            size_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getSizeInfo () {
            try {
                const res_size = await axios.get('http://localhost:8000/api/size/find/'+this.size_id);
                
                this.size = res_size.data.size;

                const res_catygory = await axios.get('http://localhost:8000/api/category/find/'+this.size.category_id);

                this.type_name = res_catygory.data.category.name;
            } catch (error) {
                console.log(error);   
            }
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getSizeInfo();
    }
}
</script>