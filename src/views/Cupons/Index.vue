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
                        <router-link to="/cupon/create" class="btn btn-primary">
                            <span class="fa-solid fa-ticket"></span>
                            
                            &nbsp;
                            
                            <span class="fa fa-plus"></span>
                        </router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ this.$t('cupon.name') }}</th>
                                        <th>{{ this.$t('cupon.coupon_quantity') }}</th>
                                        <th>{{ this.$t('cupon.min_price') }}</th>
                                        <th>{{ this.$t('product.status') }}</th>
                                        <th>{{ this.$t('cupon.quatity_of_orders') }}</th>
                                        <th>{{ this.$t('cupon.the_number_of_order') }}</th>
                                        <th>{{ this.$t('cupon.functions') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="cupon in cupons" :key="cupon.id" class="products_url" @click="pushInShowPage(cupon.id)">
                                        <td>
                                            <span>{{ cupon.name }}</span>
                                        </td>
                                        <td>
                                            <span v-if="cupon.price">{{ cupon.price }}</span>
                                            <span v-else>{{ cupon.parcent }}</span>
                                        </td>
                                        <td>
                                            <span>{{ cupon.min_price }}</span>
                                        </td>
                                        <td>
                                            <span v-if="cupon.status == 1" class="badge bg-label-success me-1">Active</span>
                                            <span v-else class="badge bg-label-danger me-1">Not Active</span>
                                        </td>
                                        <td>
                                            <span v-if="cupon.type == 0">{{ cupon.order_count }}</span>
                                            <span v-else> </span>
                                        </td>
                                        <td>
                                            <span v-if="cupon.type == 1">{{ cupon.order_count }}</span>
                                            <span v-else> </span>
                                        </td>   
                                        <td>
                                            <router-link :to="'/cupon/edit/'+cupon.id" class="ms-3"><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(cupon.id)"><i class="fa fa-trash"></i></a>
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
            cupons: [],
            cupon_id: null,
            delete_modal: false,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async pushInShowPage(id) {
            this.$router.push(`/cupon/show/${id}`)
        },

        async getCupons () {
            try {
                const res = await axios.get('http://localhost:8000/api/cupon/findAll');
                
                this.cupons = res.data.cupons;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(`http://localhost:8000/api/cupon/delete/${this.cupon_id}`);

                if (res.data == 200) this.$toast.success(this.$t('toast.cupon.deleted'));

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
            this.cupon_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },
        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCupons();
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