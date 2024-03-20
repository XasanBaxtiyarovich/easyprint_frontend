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
                        <router-link to="/cupon/index" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
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
                                        <th>{{ this.$t('cupon.name') }}:</th>
                                        <td>{{ this.cupon.name }}</td>
                                    </tr>
                                    <tr v-if="this.cupon.price">
                                        <th>{{ this.$t('cupon.price') }}:</th>
                                        <td>{{ this.cupon.price }}</td>
                                    </tr>
                                    <tr v-else-if="this.cupon.parcent">
                                        <th>{{ this.$t('cupon.percent') }}:</th>
                                        <td>{{ this.cupon.parcent }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('cupon.min_price') }}:</th>
                                        <td>{{ this.cupon.min_price }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('cupon.active') }}</th>
                                        <span v-if="cupon.status == 1" class="badge bg-label-success me-1">Active</span>
                                        <span v-else-if="cupon.status == 0" class="badge bg-label-danger me-1">Not Active</span>
                                    </tr>
                                    <tr v-if="this.cupon.type == '0'">
                                        <th>{{ this.$t('cupon.quantity') }}:</th>
                                        <td>{{ this.cupon.order_count }}</td>
                                    </tr>
                                    <tr v-else-if="this.cupon.type == '1'">
                                        <th>{{ this.$t('cupon.number') }}:</th>
                                        <td>{{ this.cupon.order_count }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('cupon.start') }}</th>
                                        <td>{{ this.cupon.start_date }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('cupon.end') }}:</th>
                                        <td>{{ this.cupon.end_date }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('cupon.created_at') }}:</th>
                                        <td>{{ this.cupon.created_at }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('cupon.updated_at') }}:</th>
                                        <td>{{ this.cupon.updated_at }}</td>
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
            cupon: {},
            delete_modal: false,
            company_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getCuponInfo () {
            try {
                const res = await axios.get('http://localhost:8000/api/cupon/find/'+this.company_id);
                
                this.cupon = res.data.cupon;
                console.log(this.cupon);
            } catch (error) {
                console.log(error);   
            }
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCuponInfo();
    }
}
</script>