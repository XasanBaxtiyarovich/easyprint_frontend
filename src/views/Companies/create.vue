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
                                <h5 class="mb-0">{{ $t('company.add') }}</h5>
                            </div>
                            <div class="card-body">
                                <form>
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
                                    <div class="mt-2">
                                        <button @click="companyCreate" class="btn btn-primary">{{ $t('create.create') }}</button>
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
            name: "",
            delivery_price: null,
            print: false
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async companyCreate (e) {
            e.preventDefault();

            try {
                const res = await axios.post('http://localhost:8000/api/company/create',
                {
                    name: this.name,
                    delivery_price: this.delivery_price,
                    print: this.print
                });

                if (res.data.status == 201) {
                    this.$toast.success('Company created')
                    setTimeout(() => {
                        this.$router.push('/company/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error('Company name already exists')
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                if (error.message == 'Request failed with status code 500') this.$toast.warning('Enter the shipping cost in Number')
                console.log(error);
            }
        },

        toggleSwitch () {
            this.print = !this.print;
        },

        cancelFunc () {
            this.$router.push('/company/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
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