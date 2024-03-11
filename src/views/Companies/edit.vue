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
                                <h5 class="card-header">{{ $t('role.update') }}</h5>
                                <div class="card-body">
                                    <form  @submit="submitFunct" id="formAccountSettings" method="POST">
                                        <div class="row">
                                            <div class="mb-3">
                                                <label class="form-label" for="basic-default-fullname">{{ $t('company.name') }}</label>
                                                <input type="text" class="form-control" v-model="name" placeholder="Pepsi" />
                                            </div>    
                                            <div class="mb-3">
                                                <label class="form-label" for="basic-default-fullname">{{ $t('company.delivery_price') }}</label>
                                                <input type="text" class="form-control" v-model="delivery_price" placeholder="30000" />
                                            </div>       
                                            <div class="mb-3" style="display: flex;">
                                                <div style="padding: 12px 12px 12px 0px;">
                                                    <label class="form-label"  for="basic-default-fullname">{{ $t('company.company_print') }}</label>
                                                </div>
                                                <div style="padding: 2px;">
                                                    <label class="switch">
                                                        <input type="checkbox" v-model="print" @click="toggleSwitch">
                                                        <span class="slider"></span>
                                                    </label>
                                                </div>
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
            name: "",
            print: false,
            delivery_price: null,
            company: {},
            roles: [],
            company_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getCompany() {
            try {
                const res = await axios.get(`http://localhost:8000/api/company/find/${this.company_id}`);

                this.company = res.data.company;

                this.name = this.company.name;
                this.print = this.company.print;
                this.delivery_price = this.company.delivery_price;
            } catch (error) {
                console.log(error);
            }
        },

        async submitFunct(e) {
            e.preventDefault();

            try {
                const res = await axios.post(`http://localhost:8000/api/company/update/${this.company_id}`, 
                {
                    name: this.name,
                    print: this.print,
                    delivery_price: this.delivery_price
                });

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.company.edited'))
                    setTimeout(() => {
                        this.$router.push('/company/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error(this.$t('toast.company.name_already'))
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                if (error.message == 'Request failed with status code 500') this.$toast.warning(this.$t('toast.company.shipping_number'))
                console.log(error);
            }
        },

        toggleSwitch () {
            this.print = !this.print;
        },

        cancelFunc () {
            this.name = this.company.name;
            this.print = this.company.print;
            this.delivery_price = this.company.delivery_price;
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getCompany();
    }
}
</script>

<style>
/* The switch - adapted from w3schools example */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>