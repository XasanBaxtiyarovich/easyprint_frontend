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
                                <h5 class="mb-0">{{ $t('banner.title.update') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="bannerUpdate">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label" for="main-image">{{ $t('banner.main') }}</label>
                                            <input class="form-control" type="file" id="main-image" @change="getFile">
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label" for="carousel-images">{{ $t('banner.carousel') }}</label>
                                            <input class="form-control" type="file" id="carousel-images" multiple @change="getFiles">
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
import { mapMutations, mapGetters } from 'vuex';

export default {
    data() {
    const router = this.$router;

        return {
            image: null,
            images: [],
            text: "",
            title: "",
            is_active: null,
            formData: new FormData(),
            banner_id: router.currentRoute.value.params.id,
        };
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

        async fetchBanner() {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+`/banner/find/${this.banner_id}`);

                const parsedBanner = res.data.parsedBanners[0];
                if (parsedBanner) {
                    const { text, title, is_active } = parsedBanner;
                    this.text = text;
                    this.title = title;
                    this.is_active = is_active;
                }
            } catch (error) {
                console.error('Error while fetching banner:', error);
                this.$toast.error('An unexpected error occurred while fetching banner data');
            }
        },

        async bannerUpdate(e) {
            try {
                e.preventDefault();

                const formData = new FormData();
                formData.append("text", this.text);
                formData.append("title", this.title);
                formData.append("is_active", this.is_active);

                // Append single image
                if (this.image) {
                    formData.append("images", this.image);
                }

                // Append multiple images
                for (const image of this.images) {
                    formData.append("images", image);
                }

                const res = await axios.post(
                    process.env.VUE_APP_LOCAL+`/banner/update/${this.banner_id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                if (res.status === 201) {
                    this.$toast.success(this.$t('toast.banner.updated'));
                    setTimeout(() => {
                        this.$router.push('/banner/index');
                    }, 1100);
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.statusCode === 400) {
                    this.$toast.error('Validate error');
                } else {
                    console.error('Error during banner update:', error);
                    this.$toast.error('An unexpected error occurred');
                }
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/banner/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted () {
        this.fetchBanner();
    }
}
</script>