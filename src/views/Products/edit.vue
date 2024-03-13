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
                                <h5 class="mb-0">{{ $t('product.title.edit') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="productCreate">
                                    <div class="mb-3">
                                        <input class="form-control" type="file" multiple @change="getFiles">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.product_name') }}</label>
                                        <input type="text" class="form-control" v-model="name" placeholder="T-shirt" />
                                    </div>        
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('product.product_category') }}</label>
                                        <select required @change="getSubCategory" v-model="parent_id" class="select2 form-select">
                                            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('product.product_sub') }}</label>
                                        <select required v-model="category_id" class="select2 form-select">
                                            <option v-for="s_c in sub_catregories" :key="s_c.id" :value="s_c.id">{{ s_c.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.manufacturer_country') }}</label>
                                        <input type="text" class="form-control" v-model="manufacturer_country" placeholder="T-shirt" />
                                    </div>                                     
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.material_composition') }}</label>
                                        <input type="text" class="form-control" v-model="material_composition" placeholder="T-shirt" />
                                    </div> 
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('product.status') }}</label>
                                        <select required v-model="status" class="select2 form-select">
                                            <option value=1>Active</option>
                                            <option value=0>Not active</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.price') }}</label>
                                        <input type="integer" class="form-control" v-model="price"/>
                                    </div> 
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.description') }}</label>
                                        <input type="text" class="form-control" v-model="description"/>
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
import router from '@/router';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            category: {},
            files: [],
            categories: [],
            sub_catregories: [],
            category_id: null,
            parent_id: null,
            name: "",
            manufacturer_country: "",
            material_composition: "",
            status: null,
            price: null,
            description: "",
            formData: new FormData(),
            product_id: router.currentRoute.value.params.id,
            product: {}
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

        async getProduct() {
            const res_product = await axios.get(`http://localhost:8000/api/product/find/${this.product_id}`);

            this.product = res_product.data.product;

            const res_category = await axios.get('http://localhost:8000/api/category/find/'+this.product.category_id)

            this.category = res_category.data.category;
     
            this.category_id = this.category.id;
            this.parent_id = this.category.parent_id;

            this.name = this.product.name;
            this.manufacturer_country = this.product.manufacturer_country,
            this.material_composition =  this.product.material_composition,
            this.status = this.product.status,
            this.price = this.product.price,
            this.description = this.product.description
        },

        async getCategories () {
            try {
                const res = await axios.get('http://localhost:8000/api/category/findAllCategory');

                this.categories = res.data.categories; 
            } catch (error) {
                console.log(error);
            }
        },
        
        async getSubCategory () {
            try {
                const res = await axios.get('http://localhost:8000/api/category/find-parent/'+this.parent_id);

                this.sub_catregories = res.data.categories; 
            } catch (error) {
                console.log(error);
            }
        },

        async productCreate (e) {
            e.preventDefault();
            
            this.formData.append("name", this.name);
            this.formData.append("price", this.price);
            this.formData.append("status", this.status);
            this.formData.append("category_id", this.category_id);
            this.formData.append("description", this.description);
            this.formData.append("material_composition", this.material_composition);
            this.formData.append("manufacturer_country", this.manufacturer_country);

            try {
                const res = await axios.post('http://localhost:8000/api/product/update/'+this.product_id,
                this.formData, 
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                });

                if (res.status == 201) {
                    this.$toast.success('Product Updated');
                    setTimeout(() => {
                        this.$router.push('/product/index')
                    }, 1100 );
                } 
            } catch (error) {
                console.log(error);
            }
        },

        cancelFunc () {
            this.$router.push('/product/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },
    mounted () {
        this.getProduct();
        this.getCategories();
        setTimeout(() => {
            this.getSubCategory();
        }, 100)
    }
}
</script>