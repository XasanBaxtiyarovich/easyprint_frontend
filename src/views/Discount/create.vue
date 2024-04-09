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
                                <h5 class="mb-0">{{ this.$t('discount.title.create') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="discountCreate">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">Discount parcent</label>
                                            <input type="text" required class="form-control" v-model="parcent"/>
                                        </div>          
                                        <div class="col-lg-6 col-sm-8 col-md-8  mb-3">
                                            <label class="form-label" for="basic-default-fullname">Discount company</label>
                                            <select v-model="company_id" required class="form-control">
                                                <option :value=0>{{ this.$t('discount.all_company') }}</option>
                                                <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
                                            </select>
                                        </div>     
                                        <div class="col-lg-4 col-sm-8 col-md-8  mb-3">
                                            <label class="form-label" for="basic-default-fullname">Category</label>
                                            <select @change="getSubCategory" class="form-control" required v-model="category_id">
                                                <option value=0>{{ this.$t('discount.all_categories') }}</option>
                                                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                            </select>
                                        </div> 
                                        <div v-if="sub" class="col-lg-4 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">Sub category</label>
                                            <select @change="getProduct" class="form-control" required v-model="sub_category_id">
                                                <option :value=0>{{ this.$t('discount.all_sub') }}</option>
                                                <option v-for="sub_category in sub_categories" :key="sub_category.id" :value="sub_category.id">{{ sub_category.name }}</option>
                                            </select>
                                        </div>    
                                        <div v-else class="col-lg-4 col-sm-8 col-md-8  mb-3">
                                        </div> 
                                        <div v-if="produ" class="col-lg-4 col-sm-8 col-md-8  mb-3">
                                            <label class="form-label" for="basic-default-fullname">Product</label>
                                            <select class="form-control" required v-model="product_id">
                                                <option :value=0>{{ this.$t('discount.all_products') }}</option>
                                                <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                                            </select>
                                        </div>    
                                        <div v-else class="col-lg-4 col-sm-8 col-md-8  mb-3">
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8  mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('cupon.start') }}</label>
                                            <input type="date" required class="form-control" v-model="start_date"/>
                                        </div>  
                                        <div class="col-lg-6 col-sm-8 col-md-8  mb-3">
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
            parcent: null,
            company_id: 0,
            category_id: null,
            sub_category_id: undefined,
            product_id: undefined,
            companies: [],
            categories: [],
            sub_categories: [],
            products: [],
            sub: false,
            produ: false,
            start_date: "",
            end_date: ""
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getCompanies () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/company/findAll');
                
                this.companies = res.data.companies;
            } catch (error) {
                console.log(error);   
            }
        },

        async getCategories () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/category/findAllCategory');

                this.categories = res.data.categories;
            } catch (error) {
                console.log(error);
            }
        },

        async getSubCategory () {
            if (this.category_id != 0) {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/category/find-parent/'+this.category_id);
                
                this.sub_categories = res.data.categories;
                this.sub = true;
            } else {
                this.sub = false;
                this.product_id = undefined;
                this.sub_category_id = undefined;
            }
        },

        async getProduct () {
            if (this.sub_category_id != 0) {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/product/findByCategoryId/'+this.sub_category_id);
                
                this.products = res.data.products;
                this.produ = true;
            } else {
                this.produ = false;
                this.product_id = undefined;
            }
        },

        async discountCreate (e) {
            e.preventDefault();

            try {
                const res = await axios.post(process.env.VUE_APP_LOCAL+'/discount/create',
                {
                    parcent: this.parcent,
                    company_id: this.company_id,
                    category_id: this.category_id,
                    sub_category_id: this.sub_category_id,
                    product_id: this.product_id,
                    start_date: this.start_date,
                    end_date: this.end_date
                });

                console.log(res);
                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.discount.create'))
                    setTimeout(() => {
                        this.$router.push('/discount/index')
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
            
            this.$router.push('/discount/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCompanies();
        this.getCategories();
    }
}
</script>