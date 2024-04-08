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
                                <h5 class="mb-0">{{ $t('banner.title.create') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="bannerCreate">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label" for="main-image">{{ $t('banner.main') }}</label>
                                            <input class="form-control" type="file" id="main-image" @change="getFile">
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label" for="carousel-images">{{ $t('banner.carousel') }}</label>
                                            <input required class="form-control" type="file" id="carousel-images" multiple @change="getFiles">
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="product-title">{{ $t('banner.title_baner') }}</label>
                                        <input required type="text" class="form-control" id="product-title" v-model="title"/>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="product-text">{{ $t('banner.description_baner') }}</label>
                                        <input required type="text" class="form-control" id="product-text" v-model="text"/>
                                    </div>     
                                    <div class="mb-3">
                                        <label class="form-label" for="banner-status">{{ $t('banner.status') }}</label>
                                        <select required v-model="is_active" class="form-select" id="banner-status">
                                            <option value=1>Active</option>
                                            <option value=0>Not active</option>
                                        </select>
                                    </div>
                                    <div class="mt-2">
                                        <button type="submit" class="btn btn-primary">{{ $t('create.create') }}</button>
                                        <button @click="cancelFunc" class="btn btn-outline-secondary ms-2">{{ $t('edit.cancle_btn') }}</button>
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
            image: {},
            images: [],
            text: "",
            title: "",
            is_active: null,
            formData: new FormData(),
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        getFile (e) {
            this.image = e.target.files[0];
        },

        getFiles (e) {
            this.images = e.target.files;
        },

        async bannerCreate (e) {
            e.preventDefault();

            try {
                const formData = new FormData();
                formData.append("images", this.image);
                
                for (let i = 0; i < this.images.length; i++) {
                    formData.append("images", this.images[i]);
                }
                
                formData.append("text", this.text);
                formData.append("title", this.title);
                formData.append("is_active", this.is_active);

                const res = await axios.post('http://localhost:8000/api/banner/create', formData);

                if (res.status === 201) {
                    this.$toast.success(this.$t('toast.banner.create'));
                    setTimeout(() => {
                        this.$router.push('/banner/index');
                    }, 1100 );
                } 
            } catch (error) {
                if (error.response && error.response.data && error.response.data.statusCode === 400) {
                    this.$toast.error('Validate error');
                } else {
                    console.error('Error during banner creation:', error);
                    this.$toast.error('An unexpected error occurred');
                }
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/banner/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    }
}
</script>