<template>
    <div v-if="delete_modal" class="background-transparent" @click="closeModal" style="position: absolute; background-color: rgb(0, 0, 0, 0.5); width: 100%; height: 100%; z-index: 20;"></div>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <company-layout-menu/>
            <div v-if="MobileMenu">
                <company-layout-menu-mobile :closeSideBar="closeSideBar"></company-layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container" style="margin-top: 90px; padding: 0px 75px;">
                    <div style="display: flex; justify-content: end; width: 100%;">
                        <router-link to="/company/user/index" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</router-link>
                    </div>
                    <div class="content-wrapper">
                        <div class="table-responsive" style="overflow: hidden;">
                            <table class="table card-table">
                                <thead>
                                    <tr>
                                        <th style="font-size: 20px;">{{ this.$t('product.attributes') }}</th>
                                        <th style="font-size: 20px;">{{ this.$t('product.informations') }}</th>
                                    </tr>
                                </thead>
                                <tbody v-if="this.user && this.user.personal_info" class="table-border-bottom-0" >
                                    <tr>
                                        <th>First name:</th>
                                        <td>{{ this.user.personal_info.first_name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Last name:</th>
                                        <td>{{ this.user.personal_info.last_name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Middle name:</th>
                                        <td>{{ this.user.personal_info.middle_name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender:</th>
                                        <td v-if="user.personal_info.gender == 1" class="me-1">Men</td>
                                        <td v-else-if="user.personal_info.gender == 2" class="me-1">Women</td>
                                    </tr>
                                    <tr>
                                        <th>Birth date:</th>
                                        <td>{{ this.birth_date }}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{{ this.user.email }}</td>
                                    </tr> 
                                    <tr>
                                        <th>Phone number:</th>
                                        <td>{{ this.user.phone_number }}</td>
                                    </tr>
                                    <tr>
                                        <th>Role:</th>
                                        <td>{{ this.user.role.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Image:</th>
                                        <td><img class="img-fluid" width="250px" height="250px" :src="this.user.personal_info.avatar" alt="User Image"></td>
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
import router from '@/router';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            user: {},
            birth_date: "",
            delete_modal: false,
            user_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },
    
    methods: {
        async getUser () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/users/find/'+this.user_id);
                
                this.user = res.data.user;
                console.log(this.user);

                const formattedBirthDate = new Date(this.user.personal_info.birth_date);
                this.birth_date = formattedBirthDate.toISOString().split('T')[0];
            } catch (error) {
                console.log(error);   
            }
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getUser();
    }
}
</script>