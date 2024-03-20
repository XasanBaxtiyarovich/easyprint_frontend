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
                                        <div class="row">
                                            <div class="mb-3">
                                                <label class="form-label" for="basic-default-fullname">{{ $t('category.name') }}</label>
                                                <input type="text" class="form-control" v-model="name" placeholder="Hoodies" />
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
            category: {},
            category_id: router.currentRoute.value.params.id
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
            } catch (error) {
                console.log(error);
            }
        },

        async submitFunct(e) {
            e.preventDefault();

            try {
                const res = await axios.post(`http://localhost:8000/api/category/update/${this.category_id}`, 
                {
                    name: this.name,
                });

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.category.edited'))
                    setTimeout(() => {
                        this.$router.push('/category/index')
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

        cancelFunc (e) {
            e.preventDefault();
            
            this.name = this.category.name;

            this.$router.push('/category/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCategory();
    }
}
</script>