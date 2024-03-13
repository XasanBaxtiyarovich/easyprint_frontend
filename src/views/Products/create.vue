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
                                <h5 class="mb-0">{{ $t('product.title.create') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="productCreate">
                                    <div class="mb-3">
                                        <input required class="form-control" type="file" multiple @change="getFiles">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.product_name') }}</label>
                                        <input required type="text" class="form-control" v-model="name" placeholder="Nike" />
                                    </div>        
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('product.product_category') }}</label>
                                        <select required @change="getSubCategory" v-model="category_id" class="select2 form-select">
                                            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('product.product_sub') }}</label>
                                        <select required v-model="parent_id" class="select2 form-select">
                                            <option v-for="s_c in sub_catregories" :key="s_c.id" :value="s_c.id">{{ s_c.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.manufacturer_country') }}</label>
                                        <input required type="text" class="form-control" v-model="manufacturer_country" placeholder="Uzbekistan" />
                                    </div>                                     
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.material_composition') }}</label>
                                        <input required type="text" class="form-control" v-model="material_composition" placeholder="Cotton, polyester" />
                                    </div> 
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('product.status') }}</label>
                                        <select required v-model="status" class="select2 form-select">
                                            <option value=1>Active</option>
                                            <option value=2>Not active</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.price') }}</label>
                                        <input required type="integer" class="form-control" v-model="price" placeholder="30000" />
                                    </div> 
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('product.description') }}</label>
                                        <input required type="text" class="form-control" v-model="description" placeholder="The  T-shirts are cotton, polyester, and cotton-polyester blends." />
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
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
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
                const res = await axios.get('http://localhost:8000/api/category/find-parent/'+this.category_id);

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
            this.formData.append("category_id", this.parent_id);
            this.formData.append("description", this.description);
            this.formData.append("material_composition", this.material_composition);
            this.formData.append("manufacturer_country", this.manufacturer_country);

            try {
                const res = await axios.post('http://localhost:8000/api/product/create',
                this.formData, 
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                });

                if (res.status == 201) {
                    this.$toast.success('Product created');
                    setTimeout(() => {
                        this.$router.push('/product/index')
                    }, 1100 );
                } 
            } catch (error) {
               if (error.response.data.statusCode == 400) this.$toast.error(this.$t('toast.product.created_error'));
                
                console.log(error);
            }
        },

        cancelFunc () {
            this.$router.push('/product/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },
    mounted () {
        this.getCategories();
    }
}
</script>