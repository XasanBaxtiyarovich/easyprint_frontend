<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <layout-menu/>
            <div v-if="MobileMenu">
                <layout-menu-mobile :closeSideBar="closeSideBar"></layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container-xxl flex-grow-1 container-p-y mt-5">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card mt-3">
                                <h5 class="card-header">{{ $t('category.update') }}</h5>
                                <div class="card-body">
                                    <form  @submit="submitFunct" id="formAccountSettings" method="POST">
                                        <div style="display: flex;">
                                            <div class="mb-3" style="width: 49%;">
                                                <label class="form-label" for="country">{{ this.$t('sub_category.name') }}</label>
                                                <select v-model="name" class="select2 form-select">
                                                    <option v-for="sub_category in sub_categories" :key="sub_category.id" :value="sub_category.name">{{ sub_category.name }}</option>
                                                </select>
                                            </div>  
                                            <div class="mb-3" style="width: 49%; margin-left: 30px;">
                                                <label class="form-label" for="country">{{ this.$t('sub_category.parent') }}</label>
                                                <select v-model="parent_id" class="select2 form-select">
                                                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mt-2">
                                            <button type="submit" class="btn btn-primary me-2">{{ $t('edit.save_btn') }}</button>
                                            <button @click="cancelFunc" class="btn btn-outline-secondary">{{ $t('edit.cancle_btn') }}</button>
                                        </div>
                                    </form>
                                </div>
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
            name: "",
            categories: [],
            parent_id: null,
            category: {},
            category_id: router.currentRoute.value.params.id,
            sub_categories: [
                {id: 1, name: 'Unisex'},
                {id: 2, name: 'Women'},
                {id: 3, name: 'Men'},
                {id: 4, name: 'Children'}
            ]
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getCategory() {
            try {
                const res = await axios.get(`http://localhost:8000/api/category/find/${this.category_id}`);

                this.category = res.data.category;

                this.name = this.category.name;
                this.parent_id = this.category.parent_id;
            } catch (error) {
                console.log(error);
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

        async submitFunct(e) {
            e.preventDefault();

            try {
                const res = await axios.post(`http://localhost:8000/api/category/sub-update/${this.category_id}`, 
                {
                    name: this.name,
                    parent_id: this.parent_id
                });

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.category.edited'))
                    setTimeout(() => {
                        this.$router.push('/sub-category/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error(this.$t('toast.category.name_already'))
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                if(error.response.data.statusCode == 400) return this.$toast.error(this.$t('toast.category.name_validate'));

                console.log(error);
            }
        },

        cancelFunc () {
            this.name = this.category.name;

            this.$router.push('/sub-category/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCategory();
        this.getCategories();
    }
}
</script>