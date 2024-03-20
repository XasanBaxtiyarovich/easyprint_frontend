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
                                <form>
                                    <div class="mb-3">
                                        <input class="form-control" type="file" @change="getImage">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ $t('create.firstname') }}</label>
                                        <input type="text" class="form-control" v-model="firstname" placeholder="John" />
                                    </div>                       
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ $t('create.lastname') }}</label>
                                        <input type="text" class="form-control" v-model="lastname" placeholder="Doe" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-email">{{ $t('create.email') }}</label>
                                        <div class="input-group input-group-merge">
                                        <input
                                            type="text"
                                            v-model="email"
                                            class="form-control"
                                            placeholder="john.doe"
                                            aria-label="john.doe"
                                            aria-describedby="basic-default-email2" />
                                        <span class="input-group-text">@example.com</span>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="basic-default-fullname">{{ $t('create.password') }}</label>
                                        <input type="password" class="form-control" v-model="password" placeholder="* * * * * *" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="country">{{ $t('create.role') }}</label>
                                        <select  @change="isCompany()" v-model="role" class="select2 form-select">
                                            <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
                                        </select>
                                    </div>
                                    <div v-if="company" class="mb-3">
                                        <label class="form-label" for="country">{{ $t('company.add') }}</label>
                                        <select v-model="company_id" class="select2 form-select">
                                            <option v-for="c in companies" :key="c.id" :value="c.id">{{ c.name }}</option>
                                        </select>
                                    </div>
                                    <div class="mt-2">
                                        <button @click="userCreate" class="btn btn-primary">{{ $t('create.create') }}</button>
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
            image: "",
            email: "",
            roles: [],
            role: null,
            password: "",
            lastname: "",
            firstname: "",
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
            this.formData.append("lastname", this.lastname);
            this.formData.append("password", this.password);
            this.formData.append("firstname", this.firstname);
            this.formData.append("company_id", this.company_id);

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
                if (error.response.data.message) this.$toast.error(this.$t('toast.user.created_error'));

                console.log(error.response.data.message[0]);
            }
        },

        cancelFunc () {
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