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
                                <h5 class="card-header">{{ $t('my_profil.profil_title') }}</h5>
                                <!-- Account -->
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
                                            <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                                <i class="bx bx-reset d-block d-sm-none"></i>
                                                <span class="d-none d-sm-block">{{ $t('my_profil.reset_btn') }}</span>
                                            </button>
                                            <p class="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-0" />
                                <div class="card-body">
                                    <form id="formAccountSettings" method="POST" onsubmit="return false">
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label for="firstName" class="form-label">{{ $t('my_profil.firstname') }}</label>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    v-model="firstname"
                                                    autofocus />
                                            </div>
                                            <div class="mb-3 col-md-6">
                                            <label for="lastName" class="form-label">{{ $t('my_profil.lastname') }}</label>
                                            <input class="form-control" type="text" name="lastName" id="lastName" v-model="lastname" />
                                            </div>
                                            <div class="mb-3 col-md-6">
                                            <label for="email" class="form-label">{{ $t('my_profil.email') }}</label>
                                            <input
                                                class="form-control"
                                                type="text"
                                                id="email"
                                                v-model="email" />
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
                                                            autofocus />
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
            role: {},
            user: {},
            role: 2,
            email: "",
            image: "",
            password: "",
            lastname: "",
            firstname: "",
            fileInput: "",
            new_password: "",
            confirm_password: "",
            formData: new FormData(),
            is_selected_photo: false,
            confirm_deactivate: false
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

                this.firstname = this.user.firstname;
                this.lastname = this.user.lastname;
                this.email = this.user.email;
                this.image = this.user.image;

            }
        },

        async submitFunct() {
            this.formData.append('email', this.email);
            this.formData.append('lastname', this.lastname);
            this.formData.append('firstname', this.firstname);

            try {
                const res = await axios.post(`http://localhost:8000/api/users/update/${this.user.id}`, 
                this.formData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                });

                localStorage.setItem('user', JSON.stringify(res.data.updated_user));

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.user.data_edited'))
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

        async resetPassFunc() {
            try {
                const res = await axios.post('http://localhost:8000/api/users/update-pass', 
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
                    const res = await axios.get(`http://localhost:8000/api/users/actived-or-notactivated/${token}`);

                    if (res.data.message === 'User not activeted') {
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

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getUser();

        this.fileInput = this.$refs.fileInput;
    }
}
</script>