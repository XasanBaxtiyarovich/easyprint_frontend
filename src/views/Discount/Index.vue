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
                        <router-link to="/discount/create" class="btn btn-primary">
                            <span class="fa-solid fa-percent"></span>
                            
                            &nbsp;
                            
                            <span class="fa fa-plus"></span>
                        </router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ this.$t('discount.parcent') }}</th>
                                        <th>{{ this.$t('discount.category') }}</th>
                                        <th>{{ this.$t('discount.product') }}</th>
                                        <th>{{ this.$t('discount.type') }}</th>
                                        <th>{{ this.$t('discount.number_products') }}</th>
                                        <th>{{ $t('role.function') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="discount in discounts" :key="discount.discount.id"  class="products_url" @click="pushInShowPage(discount.discount[0].discount_number)">
                                        <td>
                                            <span class="fw-medium">{{ discount.discount[0].parcent }}%</span>
                                        </td>
                                        <td>
                                            <span class="fw-medium">{{ [ discount.category, discount.subcategory ].join(', ') }}</span>
                                        </td>
                                        <td v-if="discount.discount.length == 1">
                                            <span >{{ discount.discount[0].product_id.name }}</span>
                                        </td>
                                        <td v-else-if="discount.discount.length > 1">
                                            <span>{{ this.$t('discount.all_products') }}</span>
                                        </td>
                                        <td v-else>
                                        </td>
                                        <td>
                                            <span v-if="discount.discount[0].type == 1" class="me-1">{{ this.$t('discount.product') }}</span>
                                            <span v-else-if="discount.discount[0].type == 2" class="me-1">{{ this.$t('discount.company') }}</span>
                                        </td>
                                        <td>
                                            <span>{{ discount.number }}</span>
                                        </td>
                                        <td>
                                            <router-link :to="'/discount/edit/'+discount.discount[0].discount_number" class="ms-3" @click.stop><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(discount.discount[0].discount_number)" @click.stop><i class="fa fa-trash"></i></a>
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
            products: [],
            discounts: [],
            discount_id: null,
            delete_modal: false,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async pushInShowPage(id) {
            this.$router.push(`/discount/show/${id}`)
        },

        async getDiscounts () {
            try {
                const res = await axios.get('http://localhost:8000/api/discount/findAll');
                
                this.discounts = res.data.discounts;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(`http://localhost:8000/api/discount/delete/${this.discount_id}`);

                if (res.data.status == 200) this.$toast.success(this.$t('discount.deleted'));

                if (res.data.status != 200) this.$toast.error('Internal server error');

                setTimeout(() => {
                        location.reload();
                }, 1000 );
            } catch (error) {
                if (error.response.data.message) this.$toast.error('Internal server error');

                console.log(error);
            }
        },

        deleteModal (id) {
            this.discount_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getDiscounts();
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