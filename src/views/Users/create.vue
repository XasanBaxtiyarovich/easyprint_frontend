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
                                <h5 class="mb-0">{{ $t('create.title') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="userCreate">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="basic-default-fullname">Avatar image</label>
                                            <input class="form-control" type="file" required @change="getImage">
                                        </div>
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
                                            <label class="form-label" for="basic-default-fullname">{{ $t('create.password') }}</label>
                                            <input type="password" class="form-control" required v-model="password" placeholder="* * * * * *" />
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="phone">Phone Number (Uzbekistan):</label>
                                            <input type="tel" class="form-control" v-model="phone_number" placeholder="XX-XX-XXX-XX-XX" required>
                                        </div>
                                        <div class="col-lg-6 col-sm-8 col-md-8 mb-3">
                                            <label class="form-label" for="country">{{ $t('create.role') }}</label>
                                            <select  @change="isCompany()" v-model="role" required class="select2 form-select">
                                                <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
                                            </select>
                                        </div>
                                        <div v-if="company" class="mb-3">
                                            <label class="form-label" for="country">{{ $t('company.add') }}</label>
                                            <select v-model="company_id" required class="select2 form-select">
                                                <option v-for="c in companies" :key="c.id" :value="c.id">{{ c.name }}</option>
                                            </select>
                                        </div>
                                        <div class="mt-2">
                                            <button type="submit" class="btn btn-primary">{{ $t('create.create') }}</button>
                                            <button @click="cancelFunc" class="btn btn-outline-secondary" style="margin-left: 5px;">{{ $t('edit.cancle_btn') }}</button>
                                        </div>
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
            image: "",
            email: "",
            roles: [],
            role: null,
            gender: null,
            password: "",
            lastname: "",
            firstname: "",
            birth_date: "",
            middle_name: "",
            phone_number: "",
            formData: new FormData(),
            companies: [],
            company: false,
            company_id: null
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        getImage (e) {
            this.formData.append("image", e.target.files[0]);
        },

        async getRoles () {
            try {
                const res = await axios.get('http://localhost:8000/api/role/findAll');

                this.roles = res.data.roles; 
            } catch (error) {
                console.log(error);
            }
        },

        async isCompany() {
            if (this.role && this.role == 2 || this.role && this.role == 4) {
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

        async userCreate (e) {
            e.preventDefault();
            
            this.formData.append("role", this.role);
            this.formData.append("email", this.email);
            this.formData.append("gender", this.gender);
            this.formData.append("password", this.password);
            this.formData.append("last_name", this.lastname);
            this.formData.append("first_name", this.firstname);
            this.formData.append("birth_date", this.birth_date);
            if(this.company_id != null && this.company_id != undefined) this.formData.append("company_id", this.company_id);
            this.formData.append("middle_name", this.middle_name);
            this.formData.append("phone_number", this.phone_number);

            try {
                const res = await axios.post('http://localhost:8000/api/users/create',
                this.formData, 
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                });

                if (res.data.status == 201) {
                    this.$toast.success(this.$t('toast.user.created'));
                    setTimeout(() => {
                        this.$router.push('/user/index')
                    }, 1100 );
                } 
            } catch (error) {
                console.log(error);
                if (error.response.data.message) this.$toast.error(this.$t('toast.user.created_error'));

                console.log(error.response.data.message[0]);
            }
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/user/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },
    mounted () {
        this.getRoles();
        this.getCompanies();
    }
}
</script>