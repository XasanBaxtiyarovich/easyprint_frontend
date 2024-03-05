<template>
    <div v-if="delete_modal" class="background-transparent" @click="closeModal" style="position: absolute; background-color: rgb(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 20;"></div>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <layout-menu/>
            <div v-if="MobileMenu">
                <layout-menu-mobile :closeSideBar="closeSideBar"></layout-menu-mobile>
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
                        <router-link to="/user/create" class="btn btn-primary"><span class="fa fa-users"></span>&nbsp;&nbsp<span class="fa fa-plus"></span></router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive text-nowrap">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th>{{ $t('table.email') }}</th>
                                        <th>{{ $t('table.firstname') }}</th>
                                        <th>{{ $t('table.lastname') }}</th>
                                        <th>{{ $t('table.active') }}</th>
                                        <th>{{ $t('table.role') }}</th>
                                        <th>{{ $t('table.function') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="user in users" :key="user.id">
                                        <td>
                                            <span class="fw-medium">{{ user.email }}</span>
                                        </td>
                                        <td>{{ user.firstname }}</td>
                                        <td>{{ user.lastname }}</td>
                                        <td>
                                            <span v-if="user.is_active === true" class="badge bg-label-success me-1">Active</span>
                                            <span v-else class="badge bg-label-danger me-1">Not Active</span>
                                        </td>
                                        <td>
                                            {{ user.role.name }}
                                        </td>
                                        <td>
                                            <!-- <router-link :to="'/user/edit/'+user.id" class="ms-1"><i class="fa fa-eye"></i></router-link> -->
                                            <router-link :to="'/user/edit/'+user.id" class="ms-3"><i class="fa fa-edit"></i></router-link>
                                            <a class="ms-3" style="color: red;" @click="deleteModal(user.id)"><i class="fa fa-trash"></i></a>
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
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getUser () {
            if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
                this.user = await JSON.parse(localStorage.getItem('user'));

                this.role = this.user.role;
            }
        },

        async getUsers () {
            try {
                const res = await axios.get('http://localhost:8000/api/users/findAll');
                
                this.users = res.data.users;

                const eventUsers = this.users.filter(userFl => userFl.id != this.user.id);

                this.users = eventUsers;
            } catch (error) {
                console.log(error);   
            }
        },

        async deleteFunc () {
            try {
                const res = await axios.delete(`http://localhost:8000/api/users/delete/${this.user_id}`);

                if (res.data == 200) this.$toast.success('User deleted successfully');

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
        this.getUsers();
    }
}
</script>