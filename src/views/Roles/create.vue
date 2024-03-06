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
                                <h5 class="mb-0">{{ $t('role.create') }}</h5>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ $t('role.new_name') }}</label>
                                        <input type="text" class="form-control" v-model="name" placeholder="Admin" />
                                    </div>          
                                    <div class="mt-2">
                                        <button @click="roleCreate" class="btn btn-primary">{{ $t('create.create') }}</button>
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
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async roleCreate (e) {
            e.preventDefault();

            try {
                const res = await axios.post('http://localhost:8000/api/role/create',
                {
                    name: this.name
                });

                if (res.data.status == 201) {
                    this.$toast.success('Role created')
                    setTimeout(() => {
                        this.$router.push('/role/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error('Role name already exists')
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                console.log(error);
            }
        },

        cancelFunc () {
            this.$router.push('/role/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    }
}
</script>