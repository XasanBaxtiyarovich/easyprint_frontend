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
                                <h5 class="mb-0">{{ this.$t('size.title.create') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="sizeCreate">
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ this.$t('size.name') }}</label>
                                        <input required type="text" class="form-control" v-model="name" placeholder="XXL" />
                                    </div>        
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('size.category') }}</label>
                                        <select required @change="getSubCategory" v-model="category_id" class="select2 form-select">
                                            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                                        </select>
                                    </div>        
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ this.$t('size.status') }}</label>
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
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            name: "",
            status: null,
            categories: [],
            category_id: null
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getCategories () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/category/findAllCategory');

                this.categories = res.data.categories; 
            } catch (error) {
                console.log(error);
            }
        },

        async sizeCreate (e) {
            e.preventDefault();

            try {
                const res = await axios.post(process.env.VUE_APP_LOCAL+'/size/create',
                {
                    name: this.name,
                    status: +this.status,
                    category_id: this.category_id
                });

                if (res.data.status == 201) {
                    this.$toast.success(this.$t('size.created'));
                    setTimeout(() => {
                        this.$router.push('/size/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error(this.$t('size.already'))
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
               if (error.response.data.statusCode == 400) this.$toast.error(this.$t('size.create_error'));
                
                console.log(error);
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/size/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },
    mounted () {
        this.getCategories();
    }
}
</script>