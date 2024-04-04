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
                                            <select  @change="isCompany()" v-model="role_id" required class="select2 form-select">
                                                <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
                                            </select>
                                        </div>
                                        <div v-if="company" class="mb-3">
                                            <label class="form-label" for="country">{{ $t('company.add') }}</label>
                                            <select v-model="company_id" required class="select2 form-select">
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
            email: "",
            lastname: "",
            firstname: "",
            middle_name: "",
            gender: null,
            birth_date: "",
            role_id: null,
            company_id: null,
            phone_number: "",

            user: {},
            role: {},
            roles: [],
            companies: [],
            image: "",
            fileInput: "",
            company: false,
            is_selected_photo: false,
            formData: new FormData(),
            user_id: router.currentRoute.value.params.id,
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getUser() {
            const res = await axios.get(`http://localhost:8000/api/users/find/${this.user_id}`);

            this.user = res.data.user;
            
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
          
            if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
                this.role = await JSON.parse(localStorage.getItem('user')).role;
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
            this.formData.append('last_name', this.lastname);
            this.formData.append('first_name', this.firstname);
            this.formData.append('middle_name', this.middle_name);
            this.formData.append('gender', parseInt(this.gender));
            this.formData.append('birth_date', parseInt(this.birth_date));
            this.formData.append('role', parseInt(this.role_id));
            if(this.company_id != null && this.company_id != undefined) this.formData.append('company_id', parseInt(this.company_id));
            this.formData.append('phone_number', parseInt(this.phone_number));

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

        cancelFunc (e) {
            e.preventDefault();

            this.$router.push('/user/index')
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

        confirmDeactivate(e) {
            this.confirm_deactivate = e.target.checked;
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