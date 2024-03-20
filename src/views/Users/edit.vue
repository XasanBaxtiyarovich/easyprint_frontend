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
                                <h5 class="card-header">{{ $t('edit.profil_title') }}</h5>
                                <div class="card-body">
                                    <div class="d-flex align-items-start align-items-sm-center gap-4">
                                        <img
                                        :src="user.image"
                                            alt="user-avatar"
                                            id="profile_avatar"
                                            class="d-block rounded"
                                            height="100"
                                            width="100">
                                        <div class="button-wrapper">
                                            <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                                            <span class="d-none d-sm-block">{{ $t('edit.upload_btn') }}</span>
                                            <i class="bx bx-upload d-block d-sm-none"></i>
                                            <input 
                                                type="file"
                                                id="upload"
                                                ref="fileInput"
                                                class="account-file-input"
                                                hidden
                                                accept="image/png, image/jpeg" 
                                                @change="getImage"/>
                                            </label>
                                            <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                            <i class="bx bx-reset d-block d-sm-none"></i>
                                            <span class="d-none d-sm-block">{{ $t('edit.reset_btn') }}</span>
                                            </button>
                        
                                            <p class="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-0" />
                                <div class="card-body">
                                    <form  @submit="submitFunct" id="formAccountSettings" method="POST">
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label for="firstName" class="form-label">{{ $t('edit.firstname') }}</label>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    required
                                                    v-model="firstname"
                                                    autofocus />
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label for="lastName" class="form-label">{{ $t('edit.lastname') }}</label>
                                                <input class="form-control" type="text" name="lastName" id="lastName" required v-model="lastname" />
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label for="email" class="form-label">{{ $t('edit.email') }}</label>
                                                <input
                                                    class="form-control"
                                                    type="email"
                                                    required
                                                    id="email"
                                                    v-model="email" />
                                            </div>
                                            <div class="mb-3 col-md-6" v-if="role.id == 3">
                                                <label class="form-label" for="country">{{ $t('edit.role') }}</label>
                                                <select required @change="isCompany" v-model="role_id" class="select2 form-select">
                                                    <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
                                                </select>
                                            </div>
                                            <div v-if="company" class="mb-3">
                                                <label class="form-label" for="country">{{ $t('company.add') }}</label>
                                                <select v-model="company_id" class="select2 form-select">
                                                    <option v-for="c in companies" :key="c.id" :value="c.id">{{ c.name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mt-2">
                                            <button type="submit" class="btn btn-primary me-2">{{ $t('edit.save_btn') }}</button>
                                            <button @click="cancelFunc" class="btn btn-outline-secondary">{{ $t('edit.cancle_btn') }}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card mt-3">
                                <h5 class="card-header">{{ $t('edit.deactivate_title') }}</h5>
                                <div class="card-body">
                                    <div class="mb-3 col-12 mb-0">
                                    </div>
                                    <form id="formAccountDeactivation" onsubmit="return false">
                                        <div class="form-check mb-3">
                                            <input
                                            class="form-check-input"
                                            type="checkbox"
                                            @change="confirmDeactivate"/>
                                            <span>{{ $t('edit.deactiveted_confirm') }}</span>
                                        </div>
                                        <div v-if="this.user.is_active == 'true' || this.user.is_active == true">
                                            <button  v-if="confirm_deactivate" class="btn btn-danger deactivate-account" @click="deactiveted">{{ $t('edit.deactivate') }}</button>
                                            <button  v-else class="btn btn-danger deactivate-account" style="opacity: 0.5;">{{ $t('edit.deactivate') }}</button>
                                        </div>
                                        <div v-else>
                                            <button  v-if="confirm_deactivate" class="btn btn-success deactivate-account" @click="deactiveted">{{ $t('edit.activate') }}</button>
                                            <button  v-else class="btn btn-success deactivate-account" style="opacity: 0.5;">{{ $t('edit.activate') }}</button>
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
            user: {},
            role: {},
            roles: [],
            my_data: {},
            email: "",
            image: "",
            lastname: "",
            fileInput: "",
            firstname: "",
            role_id: null,
            is_selected_photo: false,
            confirm_deactivate: false,
            formData: new FormData(),
            user_id: router.currentRoute.value.params.id,
            companies: [],
            company: false,
            company_id: null
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getUser() {
            const res = await axios.get(`http://localhost:8000/api/users/find/${this.user_id}`);

            this.user = res.data.user;

            this.email = this.user.email;
            this.image = this.user.image;  
            this.role_id = this.user.role.id;
            this.lastname = this.user.lastname;
            this.firstname = this.user.firstname;

            if (this.user.company_id != null) {
                this.company = true;

                this.company_id = this.user.company_id;
            }
          
            if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
                this.my_data = await JSON.parse(localStorage.getItem('user'));

                this.role = this.my_data.role;
            }


        },

        async isCompany() {
            if (this.role_id && this.role_id == 2 || this.role_id && this.role_id == 4) {

                this.company = true;
            } else {
                this.company_id = null;

                this.company = false;
            }
        },

        async getCompanies () {
            try {
                const res = await axios.get('http://localhost:8000/api/company/findAll')

                this.companies = res.data.companies;
            } catch (error) {
                console.log(error);
            }
        },

        async getRoles () {
            try {
                const res = await axios.get('http://localhost:8000/api/role/findAll');

                this.roles = res.data.roles; 
            } catch (error) {
                console.log(error);
            }
        },

        async submitFunct(e) {
            e.preventDefault();

            this.formData.append('email', this.email);
            this.formData.append('lastname', this.lastname);
            this.formData.append('firstname', this.firstname);
            this.formData.append('role', parseInt(this.role_id));

            try {
                const res = await axios.post(`http://localhost:8000/api/users/update/${this.user_id}`, 
                this.formData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                });

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.user.edited'))
                    setTimeout(() => {
                        this.$router.push('/user/index')
                    }, 1100 );
                }
            } catch (error) {
                if (error.response.data.message) this.$toast.error('Internal server error');

                console.log(error);
            }
        },

        cancelFunc () {
            this.email = this.user.email;
            this.image = this.user.image;
            this.lastname = this.user.lastname;
            this.firstname = this.user.firstname;

            this.$router.push('/user/index')
        },

        getImage() {
            this.is_selected_photo = true;
            this.formData.append("image", this.fileInput.files[0])
            var oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("upload").files[0]);
            oFReader.onload = function (oFREvent) {
                document.getElementById("profile_avatar").src = oFREvent.target.result;
            };
        },

        confirmDeactivate(e) {
            this.confirm_deactivate = e.target.checked;
        },

        async deactiveted() {
            if (this.confirm_deactivate === true) {
                try {
                    await axios.get(`http://localhost:8000/api/users/actived-or-notactivated-id/${this.user_id}`);

                    this.$router.push('/user/index')
                } catch (error) {
                    console.log(error);
                }
            }
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getUser();
        this.getRoles();
        this.getCompanies();
        this.fileInput = this.$refs.fileInput;
    }
}
</script>