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
                                <h5 class="mb-0">{{ this.$t('cupon.title.create') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="cuponCreate">
                                    <div class="row">
                                        <div class="col-lg-4 col-sm-4 col-md-4 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.name') }}</label>
                                            <input type="text" required class="form-control" v-model="name"/>
                                        </div>          
                                        <div class="col-lg-2 col-sm-4 col-md-4 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.type') }}</label>
                                            <select class="form-control" required v-model="cupon_type">
                                                <option value="price">{{ this.$t('cupon.monetary') }}</option>
                                                <option value="percent">{{ this.$t('cupon.percent') }}</option>
                                            </select>
                                        </div>    
                                        <div v-if="cupon_type == 'price'" class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.price') }}</label>
                                            <input @change="percent = null" type="text" required class="form-control" v-model="price"/>
                                        </div>        
                                        <div v-else-if="cupon_type == 'percent'" class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.parcent') }}</label>
                                            <input @change="price = null" type="text" required class="form-control" v-model="percent"/>
                                        </div>  
                                        <div class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.company') }}</label>
                                            <select v-model="company_id" required class="form-control">
                                                <option value=null>{{ this.$t('cupon.all') }}</option>
                                                <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
                                            </select>
                                        </div>     
                                        <div class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.active') }}</label>
                                            <select class="form-control" required v-model="status">
                                                <option value="1">Active</option>
                                                <option value="0">Not active</option>
                                            </select>
                                        </div> 
                                        <div class="col-lg-4 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.min_price') }}</label>
                                            <input type="text" required class="form-control" v-model="min_prace"/>
                                        </div> 
                                        <div class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.type_q_n') }}</label>
                                            <select class="form-control" required v-model="type">
                                                <option value="0">{{ this.$t('cupon.quantity') }}</option>
                                                <option value="1">{{ this.$t('cupon.number') }}</option>
                                            </select>
                                        </div>    
                                        <div v-if="type == 0" class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.cupon_quantity') }}</label>
                                            <input type="text" required class="form-control" v-model="order_count"/>
                                        </div>        
                                        <div v-else-if="type == 1" class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.cupon_number') }}</label>
                                            <input type="text" required class="form-control" v-model="order_count"/>
                                        </div>   
                                        <div class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.start') }}</label>
                                            <input type="date" required class="form-control" v-model="start_date"/>
                                        </div>  
                                        <div class="col-lg-2 col-sm-4 col-md-4  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.end') }}</label>
                                            <input type="date" required class="form-control" v-model="end_date"/>
                                        </div>  
                                    </div>
                                    <div class="mt-2">
                                        <button type="submit" class="btn btn-primary">{{ $t('create.create') }}</button>
                                        <button @click="cancelFunc" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</button>
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
import { mapMutations, mapGetters } from 'vuex';

export default {
    data () {
        return {
            name: null,
            cupon_type: "price",
            price: null,
            percent: null,
            company_id: null,
            status: 1,
            type: 0,
            min_prace: null,
            order_count: null,
            start_date: null,
            end_date: null,
            companies: []
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getCompanies () {
            try {
                const res = await axios.get('http://localhost:8000/api/company/findAll');
                
                this.companies = res.data.companies;
            } catch (error) {
                console.log(error);   
            }
        },

        async cuponCreate (e) {
            e.preventDefault();

            try {
                const res = await axios.post('http://localhost:8000/api/cupon/create',
                {
                    name: this.name,
                    price: this.price,
                    parcent: this.percent,
                    min_price: this.min_prace,
                    company_id: this.company_id,
                    order_count: this.order_count,
                    start_date: this.start_date,
                    end_date: this.end_date,
                    type: this.type,
                    status: +this.status
                });

                if (res.data.status == 201) {
                    this.$toast.success(this.$t('toast.cupon.created'))
                    setTimeout(() => {
                        this.$router.push('/cupon/index')
                    }, 1100 );
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                console.log(error);
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/cupon/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCompanies();
    }
}
</script>