<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <layout-menu v-if="role_id == 3"></layout-menu>
            <company-layout-menu v-else></company-layout-menu>
            <div v-if="MobileMenu">
                <layout-menu-mobile :closeSideBar="closeSideBar"></layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container-xxl flex-grow-1 container-p-y mt-5">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card mt-3">
                                <h5 class="card-header">{{ $t('my_profil.profil_title') }}</h5>
                                <!-- Account -->
                                <div class="card-body">
                                    <div class="d-flex align-items-start align-items-sm-center gap-4" v-if="user && user.personal_info && user.personal_info.avatar">
                                        <img
                                        :src="user.personal_info.avatar"
                                            alt="user-avatar"
                                            id="profile_avatar"
                                            class="d-block rounded"
                                            height="100"
                                            width="100">
                                        <div class="button-wrapper">
                                            <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                                                <span class="d-none d-sm-block">{{ $t('my_profil.upload_btn') }}</span>
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
                                            <router-link to="/" type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                                <i class="bx bx-reset d-block d-sm-none"></i>
                                                <span class="d-none d-sm-block">{{ $t('my_profil.cancle_btn') }}</span>
                                            </router-link>
                                            <p class="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-0" />
                                <div class="card-body">
                                    <form id="formAccountSettings" method="POST" onsubmit="return false">
                                        <div class="row">
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                <label class="form-label" for="basic-default-fullname">{{ $t('create.firstname') }}</label>
                                                <input type="text" class="form-control" required v-model="firstname" placeholder="John" />
                                            </div>                       
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                <label class="form-label" for="basic-default-fullname">{{ $t('create.lastname') }}</label>
                                                <input type="text" class="form-control" required v-model="lastname" placeholder="Smith" />
                                            </div>
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                <label class="form-label" for="basic-default-fullname">Middle name</label>
                                                <input type="text" class="form-control" required v-model="middle_name" placeholder="James" />
                                            </div>
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                <label class="form-label" for="country">Gender</label>
                                                <select v-model="gender" required class="select2 form-select">
                                                    <option :value=1>Men</option>
                                                    <option :value="2">Women</option>
                                                </select>
                                            </div>
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                    <label class="form-label" for="basic-default-fullname">Birth date</label>
                                                    <input type="date" required class="form-control" v-model="birth_date"/>
                                            </div> 
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                <label class="form-label" for="basic-default-email">{{ $t('create.email') }}</label>
                                                <div class="input-group input-group-merge">
                                                <input
                                                    required
                                                    type="text"
                                                    v-model="email"
                                                    class="form-control"
                                                    placeholder="john.smith"
                                                    aria-label="john.smith"
                                                    aria-describedby="basic-default-email2" />
                                                <span class="input-group-text">@example.com</span>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                <label class="form-label" for="phone">Phone Number (Uzbekistan):</label>
                                                <input type="tel" class="form-control" v-model="phone_number" placeholder="XX-XX-XXX-XX-XX" required>
                                            </div>
                                            <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                                <label class="form-label" for="country">{{ $t('create.role') }}</label>
                                                <select  @change="isCompany()" v-model="role_id" required class="select2 form-select" v-bind:disabled="true">
                                                    <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
                                                </select>
                                            </div>
                                            <div v-if="company" class="mb-3">
                                                <label class="form-label" for="country">{{ $t('company.company') }}</label>
                                                <select v-model="company_id" required class="select2 form-select" v-bind:disabled="true">
                                                    <option v-for="c in companies" :key="c.id" :value="c.id">{{ c.name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mt-2">
                                            <button @click="submitFunct" class="btn btn-primary me-2">{{ $t('my_profil.save_btn') }}</button>
                                            <button @click="cancelFunc" class="btn btn-outline-secondary">{{ $t('my_profil.cancle_btn') }}</button>
                                        </div>
                                    </form>
                                </div>
                                <!-- /Password Reset -->
                            </div>
                            <div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card mt-3">
                                            <h5 class="card-header">{{ $t('my_profil.password_title') }}</h5>
                                            <hr class="my-0" />
                                            <div class="card-body">
                                            <form id="formAccountSettings" method="POST" onsubmit="return false">
                                                <div class="row">
                                                    <div class="mb-3 col-md-6">
                                                        <label for="firstName" class="form-label">{{ $t('my_profil.password') }}</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            v-model="password"
                                                            />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="lastName" class="form-label">{{ $t('my_profil.new_password') }}</label>
                                                        <input class="form-control" type="text" v-model="new_password" />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="email" class="form-label">{{ $t('my_profil.confirm_password') }}</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            v-model="confirm_password"/>
                                                    </div>
                                                </div>
                                                <div class="mt-2" @click="resetPassFunc">
                                                    <button class="btn btn-primary me-2">{{ $t('my_profil.save_btn') }}</button>
                                                </div>
                                            </form>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mt-3">
                                <h5 class="card-header">{{ $t('my_profil.delete_acount_title') }}</h5>
                                <div class="card-body">
                                    <div class="mb-3 col-12 mb-0">
                                        <div class="alert alert-warning">
                                            <h6 class="alert-heading mb-1">{{ $t('my_profil.delete_acount_des1') }}</h6>
                                            <p class="mb-0">{{ $t('my_profil.delete_acount_des2') }}</p>
                                        </div>
                                    </div>
                                    <form id="formAccountDeactivation" onsubmit="return false">
                                        <div class="form-check mb-3">
                                            <input
                                            class="form-check-input"
                                            type="checkbox"
                                            @change="confirmDeactivate"/>
                                            <label class="form-check-label" for="accountActivation"
                                            >{{ $t('my_profil.delete_confirm') }}</label
                                            >
                                        </div>
                                        <button  v-if="confirm_deactivate" class="btn btn-danger deactivate-account" @click="deactiveted">{{ $t('my_profil.deactivate_btn') }}</button>
                                        <button  v-else class="btn btn-danger deactivate-account" style="opacity: 0.5;">{{ $t('my_profil.deactivate_btn') }}</button>
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
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            email: "",
            lastname: "",
            firstname: "",
            middle_name: "",
            gender: null,
            birth_date: "",
            role_id: null,
            company_id: null,
            phone_number: "",

            password: "",
            new_password: "",
            confirm_password: "",

            companies: [],
            roles: [],
            user: {},
            role: {},
            image: "",
            fileInput: "",
            formData: new FormData(),
            is_selected_photo: false,
            confirm_deactivate: false,
            company: false
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getUser() {
            if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
                this.user = await JSON.parse(localStorage.getItem('user'));

                this.role = this.user.role;

                const formattedBirthDate = new Date(this.user.personal_info.birth_date);
                this.birth_date = formattedBirthDate.toISOString().split('T')[0];

                this.phone_number = this.user.phone_number;
                this.gender = this.user.personal_info.gender;
                this.email = this.user.email;
                this.image = this.user.image;  
                this.role_id = this.user.role.id;
                this.lastname = this.user.personal_info.last_name;
                this.firstname = this.user.personal_info.first_name;
                this.middle_name = this.user.personal_info.middle_name;

                if (this.user.company_id != null) {
                this.company = true;

                this.company_id = this.user.company_id;
            }
            }
        },

        async submitFunct(e) {
            e.preventDefault();

            this.formData.append('email', this.email);
            this.formData.append('last_name', this.lastname);
            this.formData.append('first_name', this.firstname);
            this.formData.append('middle_name', this.middle_name);
            this.formData.append('gender', parseInt(this.gender));
            this.formData.append('birth_date', parseInt(this.birth_date));
            this.formData.append('role', parseInt(this.role_id));
            if(this.company_id != null && this.company_id != undefined) this.formData.append('company_id', parseInt(this.company_id));
            this.formData.append('phone_number', parseInt(this.phone_number));

            try {
                const res = await axios.post(process.env.VUE_APP_LOCAL+`/users/update/${this.user.id}`, 
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

                    localStorage.setItem('user', JSON.stringify(res.data.updated_user));
                }
            } catch (error) {
                if (error.response.data.message) this.$toast.error('Internal server error');

                console.log(error);
            }
        },

        cancelFunc () {
            const formattedBirthDate = new Date(this.user.personal_info.birth_date);
            this.birth_date = formattedBirthDate.toISOString().split('T')[0];

            this.phone_number = this.user.phone_number;
            this.gender = this.user.personal_info.gender;
            this.email = this.user.email;
            this.image = this.user.image;  
            this.role_id = this.user.role.id;
            this.lastname = this.user.personal_info.last_name;
            this.firstname = this.user.personal_info.first_name;
            this.middle_name = this.user.personal_info.middle_name;
        },

        getImage(e) {
            this.is_selected_photo = true;
            this.formData.append("image", e.target.files[0])
            var oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("upload").files[0]);
            oFReader.onload = function (oFREvent) {
                document.getElementById("profile_avatar").src = oFREvent.target.result;
            };
        },

        async resetPassFunc() {
            try {
                const res = await axios.post(process.env.VUE_APP_LOCAL+'/users/update-pass', 
                {
                    password: this.password, 
                    new_password: this.new_password,
                    confirm_password: this.confirm_password,
                    token: localStorage.getItem('token')
                });

                localStorage.setItem('user', JSON.stringify(res.data.updatePasswordUser));

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.user.password_edited'));

                    setTimeout(() => {
                        location.reload();
                    }, 1500 );
                } else if (res.data.status == 401){
                    this.$toast.error(res.data.message);
                }              
            } catch (error) {
                if ( error.response.data.message[0] === 'new_password must be longer than or equal to 4 characters') this.$toast.error(this.$t('toast.user.password_error'));

                console.log(error);
            }
        },

        confirmDeactivate(e) {
            this.confirm_deactivate = e.target.checked;
        },

        async deactiveted() {
            if (this.confirm_deactivate === true) {
                const token = localStorage.getItem('token');

                try {
                    const res = await axios.get(process.env.VUE_APP_LOCAL+`/users/delete/${this.user.id}`);

                    if (res.data == 200) {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');

                        this.$router.push('/signin')
                    }
                } catch (error) {
                    if (error.response.data.message) this.$toast.error('Internal server error');

                    console.log(error);
                }
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

        async getRoles () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/role/findAll');

                this.roles = res.data.roles; 
            } catch (error) {
                console.log(error);
            }
        },

        async getCompanies () {
            try {
                const res = await axios.get(process.env.VUE_APP_LOCAL+'/company/findAll')

                this.companies = res.data.companies;
            } catch (error) {
                console.log(error);
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