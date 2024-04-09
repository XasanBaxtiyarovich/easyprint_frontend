<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <company-layout-menu/>
            <div v-if="MobileMenu">
                <company-layout-menu-mobile :closeSideBar="closeSideBar"></company-layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container" style="margin-top: 100px; padding: 0px 75px;">
                    <div class="col-xl">
                        <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">{{ $t('warehouse.title.update') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="warehouseCreate">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="country">{{ this.$t('warehouse.product') }}</label>
                                            <select required v-model="created_product_id" class="select2 form-select" v-bind:disabled="true">
                                                <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('warehouse.price') }}</label>
                                            <input required type="text" class="form-control" v-model="price"/>
                                        </div>  
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('warehouse.name') }}</label>
                                            <input required type="text" class="form-control" v-model="name"/>
                                        </div>  
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="country">{{ this.$t('warehouse.category') }}</label>
                                            <select required v-model="category_id" class="select2 form-select" v-bind:disabled="true">
                                                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="country">{{ this.$t('warehouse.size') }}</label>
                                            <select required v-model="size_id" class="select2 form-select">
                                                <option v-for="size in sizes" :key="size.id" :value="size.id">{{ size.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="country">{{ this.$t('warehouse.color') }}</label>
                                            <select required v-model="color_id" class="select2 form-select">
                                                <option v-for="color in colors" :key="color.id" :value="color.id" :style="'background-color:'+color.code">{{ color.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('warehouse.count') }}</label>
                                            <input required type="number" class="form-control" v-model="quantity"/>
                                        </div>  
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('warehouse.images') }}</label>
                                            <input class="form-control" type="file" multiple @change="getFiles">
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('warehouse.manufacture_country') }}</label>
                                            <input required type="text" class="form-control" v-model="manufacture_country"/>
                                        </div>  
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('warehouse.material_composition') }}</label>
                                            <input required type="text" class="form-control" v-model="material_composition"/>
                                        </div>  
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('warehouse.description') }}</label>
                                            <input required type="text" class="form-control" v-model="description"/>
                                        </div>  
                                        <div class="mt-2">
                                            <button type="submit" class="btn btn-primary">{{ $t('create.create') }}</button>
                                            <button @click="cancelFunc" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</button>
                                        </div>
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
import router from '@/router';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            files: [],
            products: [],
            created_product_id: null,
            categories: [],
            category_id: null,
            sizes: [],
            size_id: null,
            colors: [],
            color_id: null,
            name: null,
            price: null,
            quantity: null,
            manufacture_country: null,
            material_composition: null,
            description: null,
            formData: new FormData(),
        
        
            product_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        getFiles (e) {
            this.files = e.target.files;

            for (let i = 0; i < this.files.length; i++) {
                this.formData.append("files", this.files[i]);
            }
        },

        async getProducts () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/product/findAll');
                
                this.products = res.data.products;
            } catch (error) {
                console.log(error);   
            }
        },

        async getProduct () {
    try {
        const res = await axios.get(process.env.VUE_APP_LOCAL+'/warehouse/find/'+this.product_id);

        this.created_product_id = router.currentRoute.value.params.id;
        this.name = res.data.warehouse.name;
        this.price = res.data.warehouse.price;
        this.size_id = res.data.warehouse.size_id.id;
        this.color_id = res.data.warehouse.color_id.id;
        this.quantity = res.data.warehouse.quantity;
        this.description = res.data.warehouse.description;
        this.category_id = res.data.warehouse.product_id.category_id;
        this.created_product_id = res.data.warehouse.product_id.id;
        this.manufacture_country = res.data.warehouse.manufacture_country;
        this.material_composition = res.data.warehouse.material_composition;
    } catch (error) {
        console.log(error);
    }
},

        async getCategories () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/category/findAllSubCategory');

                this.categories = res.data.categories;
            } catch (error) {
                console.log(error);
            }
        },

        async getSizes () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/size/findAll');

                this.sizes = res.data.sizes;
            } catch (error) {
                console.log(error);
            }
        },

        async getColors () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/color/findAll');

                this.colors = res.data.colors;
            } catch (error) {
                console.log(error);
            }
        },

        async warehouseCreate (e) {
            e.preventDefault();

            this.formData.append("name", this.name);
            this.formData.append("price", this.price);
            this.formData.append("size_id", this.size_id);
            this.formData.append("color_id", this.color_id);
            this.formData.append("quantity", this.quantity);
            this.formData.append("description", this.description);
            this.formData.append("product_id", this.created_product_id);
            this.formData.append("material_composition", this.material_composition);
            this.formData.append("manufacture_country", this.manufacture_country);

            try {
                const res = await axios.post(process.env.VUE_APP_LOCAL+'/warehouse/update/'+this.product_id,
                this.formData, 
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                });

                if (res.data == 200) {
                    this.$toast.success(this.$t('toast.warehouse.updated'));
                    setTimeout(() => {
                        this.$router.push('/warehouse/products')
                    }, 1100 );
                } 
            } catch (error) {
               if (error.response.data.statusCode == 400) this.$toast.error(this.$t('toast.product.created_error'));
                
                console.log(error);
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/warehouse/products')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },
    mounted () {
        this.getProducts();
        this.getProduct();
        this.getCategories();
        this.getSizes();
        this.getColors();
    }
}
</script>