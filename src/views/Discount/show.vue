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
                        <router-link to="/discount/index" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
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
                                        <th>{{ this.$t('discount.parcent') }}:</th>
                                        <td v-if="discounts[0]">
                                            <span class="fw-medium">{{ discounts[0].parcent }}%</span>
                                        </td>
                                    </tr>  
                                    <tr>
                                        <th>{{ this.$t('discount.category') }}: </th>
                                        <td v-if="discounts.length == 1">
                                            <span >{{ discounts[0].category_id.name }}</span>
                                        </td>
                                        <td v-else-if="discounts.length > 1">
                                            <span v-for="discount in discounts">{{ discount.category_id.name+'  ' }} </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('discount.product') }}: </th>
                                        <td v-if="discounts.length == 1">
                                            <span >{{ discounts[0].product_id.name }}</span>
                                        </td>
                                        <td v-else-if="discounts.length > 1">
                                            <span v-for="discount in discounts">{{ discount.product_id.name+'  ' }} </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('discount.type') }}: </th>
                                        <td v-if="discounts[0]">
                                            <span v-if="discounts[0].type == 1" class="me-1">Product</span>
                                            <span v-else-if="discounts[0].type == 2" class="me-1">Company</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{{ this.$t('discount.number_products') }}: </th>
                                        <td v-if="number">
                                            <span>{{ number }}</span>
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
import router from '@/router';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            discounts: [],
            delete_modal: false,
            number: 0,
            discount_number: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getDiscounts () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/discount/find/'+this.discount_number);

                this.number = res.data.number;
                this.discounts = res.data.discounts;
            } catch (error) {
                console.log(error);   
            }
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {          
        this.getDiscounts();
    }
}
</script>