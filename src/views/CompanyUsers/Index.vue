<template>
    <div v-if="delete_modal" class="background-transparent" @click="closeModal" style="position: absolute; background-color: rgb(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 20;"></div>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <company-layout-menu/>
            <div v-if="MobileMenu">
                <company-mobile-layout-menu :closeSideBar="closeSideBar"></company-mobile-layout-menu>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div v-if="delete_modal" style="width: 80%; display: flex; justify-content: center; position: absolute; margin-top: 16%;">
                    <div class="card" style="width: 320px; z-index: 21;">
                        <div class="card-body">
                            <div style="display: flex; justify-content: center;">
                                <span style="margin-bottom: 20px;">{{ $t('delete.remove') }}</span>
                            </div>
                            <div style="display: flex; justify-content: space-around;">
                                <button @click="deleteFunc" class="btn btn-danger">{{ $t('delete.yes') }}</button>
                                <button @click="closeModal" class="btn btn-warning">{{ $t('delete.no') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="display: flex; justify-content: end; width: 100%;">
                        <router-link to="/company/user/create" class="btn btn-primary"><span class="fa fa-users"></span>&nbsp;&nbsp<span class="fa fa-plus"></span></router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ $t('table.image') }}</th>
                                        <th>{{ $t('table.email') }}</th>
                                        <th>{{ $t('table.firstname') }}</th>
                                        <th>{{ $t('table.lastname') }}</th>
                                        <th>{{ $t('table.phone_number') }}</th>
                                        <th>{{ $t('table.role') }}</th>
                                        <th>{{ $t('table.function') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="user in users" :key="user.id" class="products_url" @click="pushInShowPage(user.id)">
                                        <div v-if="user && user.personal_info && user.personal_info.avatar">
                                            <img :src="user.personal_info.avatar" alt class="w-px-40 h-auto rounded-circle" />
                                        </div>
                                        <td>
                                            <span class="fw-medium">{{ user.email }}</span>
                                        </td>
                                        <td>{{ user.personal_info.first_name }}</td>
                                        <td>{{ user.personal_info.last_name }}</td>
                                        <td>{{ user.personal_info.phone_number }}</td>
                                        <td>{{ user.role.name }}</td>
                                        <td>
                                            <router-link :to="'/company/user/edit/'+user.id" class="ms-3" @click.stop><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(user.id)" @click.stop><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
            user: {},
            role: {},
            users: [],
            user_id: null,
            delete_modal: false,
            company_id: null
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async pushInShowPage(id) {
            this.$router.push(`/company/user/show/${id}`)
        },

        async getUser () {
            if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
                this.user = await JSON.parse(localStorage.getItem('user'));

                this.company_id = this.user.company_id;

                this.role = this.user.role;
            }
        },

        async getUsers () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/findAll/company/'+this.company_id);
                
                this.users = res.data.users;

                const eventUsers = this.users.filter(userFl => userFl.id != this.user.id);

                this.users = eventUsers;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(process.env.VUE_APP_LOCAL+`/users/delete/${this.user_id}`);

                if (res.data == 200) this.$toast.success(this.$t('toast.user.deleted'));

                if (res.data != 200) this.$toast.error('Internal server error');

                setTimeout(() => {
                        location.reload();
                }, 1000 );
            } catch (error) {
                if (error.response.data.message) this.$toast.error('Internal server error');

                console.log(error);
            }
        },

        deleteModal (id) {
            this.user_id = id;

            this.delete_modal = true;
        },

        closeModal () {
            this.delete_modal = false;
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getUser();
        setTimeout(() =>  {
            this.getUsers();
        }, 100)
    }
}
</script>

<style>
.products_url {
    transition: 0.5s;
}

.products_url:hover {
    background-color: rgb(0, 0, 0, 0.1);
}
</style>