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
                                <h5 class="card-header">{{ $t('role.update') }}</h5>
                                <div class="card-body">
                                    <form  @submit="submitFunct" id="formAccountSettings" method="POST">
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">{{ $t('role.name') }}</label>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    required
                                                    v-model="name"
                                                    autofocus />
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
            roles: [],
            role_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getRole() {
            const res = await axios.get(`http://localhost:8000/api/role/find/${this.role_id}`);

            this.role = res.data.role;

            this.name = this.role.name;
        },

        async submitFunct(e) {
            e.preventDefault();

            try {
                const res = await axios.post(`http://localhost:8000/api/role/update/${this.role_id}`, 
                {
                    name: this.name
                });

                console.log(res);

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.role.edited'))
                    setTimeout(() => {
                        this.$router.push('/role/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error(this.$t('toast.role.name_already'))
                } else {
                    this.name = this.role.name;

                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                console.log(error);
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.name = this.role.name;
            this.$router.push('/role/index');

        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getRole();
    }
}
</script>