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
                                <h5 class="mb-0">{{ this.$t('color.title.update') }}</h5>
                            </div>
                            <div class="card-body">
                                <form @submit="colorEdit">
                                    <div>
                                        <div class="color-picker-container">
                                        <div class="color-picker-wrapper">
                                            <input required type="color" v-model="pickedColor" @input="updateColor" class="color-picker-input" />
                                            <div :style="{ backgroundColor: pickedColor }" class="color-preview"></div>
                                        </div>
                                        <div class="color-name-wrapper">
                                            <label class="form-label" for="basic-default-fullname">{{ this.$t('color.color_name') }}</label>
                                            <input required type="text" class="form-control" v-model="name" placeholder="Blue" />
                                        </div>
                                        </div>
                                    </div>   
                                    <div class="mt-2">
                                        <button type="submit" class="btn btn-primary">{{ $t('create.create') }}</button>
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
import router from '@/router';
import {mapMutations, mapGetters} from 'vuex';

export default {
    data () {
        return {
            name: "",
            pickedColor: "",
            color_id: router.currentRoute.value.params.id
        }
    },

    computed: {
      ...mapGetters(['MobileMenu']),  
    },

    methods: {
        async getColor() {
            const res = await axios.get(process.env.VUE_APP_LOCAL+`/color/find/${this.color_id}`);

            this.color = res.data.color;

            this.name = this.color.name;
            this.pickedColor = this.color.code;
        },

        async colorEdit (e) {
            e.preventDefault();

            try {
                const res = await axios.post(process.env.VUE_APP_LOCAL+'/color/update/'+this.color_id,
                {
                    name: this.name,
                    code: this.pickedColor
                });

                if (res.data.status == 200) {
                    this.$toast.success(this.$t('toast.color.updated'))
                    setTimeout(() => {
                        this.$router.push('/color/index')
                    }, 1100 );
                } else if (res.data.status == 409) {
                    this.$toast.error(this.$t('toast.color.already'))
                } else {
                    this.$toast.error('Internal server error')
                }
            } catch (error) {
                console.log(error);
            }
        },

        updateColor(event) {
            this.pickedColor = event.target.value;
        },

        cancelFunc (e) {
            e.preventDefault();
            
            this.$router.push('/color/index')
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },

    mounted() {
        this.getColor();
    }
}
</script>

<style>
.color-picker-container {
  display: flex;
  flex-direction: column;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
}

.color-picker-input {
  border: none;
  padding: 5px;
  margin-right: 10px;
}

.color-preview {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.color-name-wrapper {
  margin-top: 10px;
}

/* Customize these styles as you like */

.form-label {
  font-size: 16px;
  font-weight: bold;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}
</style>