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
                                <h5 class="mb-0">{{ this.$t('image.title.update') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="imgCreate">
                                    <div class="mb-3">
                                        <img :src="image" id="image">
                                    </div>
                                    <div class="mb-3">
                                        <input class="form-control" type="file" @change="getImage">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('product.status') }}</label>
                                        <select required v-model="status" class="select2 form-select">
                                            <option value=1>Active</option>
                                            <option value=0>Not active</option>
                                        </select>
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
            image: "",
            formData: new FormData(),
            status: null,
            image_id: router.currentRoute.value.params.id,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        getImage (e) {
            this.formData.append("image", e.target.files[0]);

            console.log(e.target.files[0]);
            var oFReader = new FileReader();
            oFReader.readAsDataURL(e.target.files[0]);
            oFReader.onload = function (oFREvent) {
                document.getElementById("image").src = oFREvent.target.result;
            };
        },

        async findImage () {
            const res = await axios.get('http://localhost:8000/api/image/find/'+this.image_id);

            this.status = res.data.image.status;
            this.image = res.data.image.name;
        },

        async imgCreate (e) {
            e.preventDefault();

            this.formData.append("status", this.status);

            try {
                const res = await axios.post('http://localhost:8000/api/image/update/'+this.image_id,
                this.formData, 
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                });

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('image.updated'));
                    setTimeout(() => {
                        this.$router.push('/image/index')
                    }, 1100 );
                } 
            } catch (error) {
                console.log(error);
            }
        },

        cancelFunc (e) {
            e.preventDefault();

            this.$router.push('/image/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.findImage();
    }
}
</script>