<template>
    <div v-if="user_menu_show" class="background-transparent" @click="showLangMenu" style="position: absolute; width: 65%; height: 100%; z-index: 25;"></div>
    <div v-if="lang_menu" class="background-transparent" @click="showLangMenu" style="position: absolute; width: 65%; height: 100%; z-index: 25;"></div>
    <div style="display: flex; justify-content: center;">
        <nav
        class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
        style="position: fixed; width: 75%;">
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                    <i class="bx bx-menu bx-sm"></i>
                </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <!-- Search -->
                <div class="navbar-nav align-items-center">
                    <div class="nav-item d-flex align-items-center">
                        <a @click="showSideBar">
                            <i class="fa fa-list"></i>
                        </a>
                        <i class="bx bx-search fs-4 lh-0"></i>
                        <input
                        type="text"
                        class="form-control border-0 shadow-none ps-1 ps-sm-2"
                        placeholder="Search..."
                        aria-label="Search..." />
                    </div>
                </div>
                <!-- /Search -->
                <ul class="navbar-nav flex-row align-items-center ms-auto">
                    <li class="nav-item navbar dropdown-user dropdown">
                        <a class="nav-link hide-arrow" @click="showLangMenu">
                            <div v-if="language === 'en'" >
                                <img src="../assets/img/lang/Eng.svg" alt class="w-px-40 h-auto" />
                            </div>
                            <div v-else-if="language === 'ru'">
                                <img src="../assets/img/lang/Ru.svg" alt class="w-px-40 h-auto" />
                            </div>
                            <div v-else-if="language === 'uz'">
                                <img src="../assets/img/lang/Uzb.svg" alt class="w-px-40 h-auto" />
                            </div>
                        </a>
                        <ul class="lang_menu" v-if="lang_menu">
                            <li>
                                <a @click="langUz" class="d-flex justify-content-between lang-btn">
                                    <span>Uzbek</span>
                                    <img src="../assets/img/lang/Uzb.svg"></img>
                                </a>
                            </li>
                            <li>
                                <a @click="langEn" class="d-flex justify-content-between lang-btn">
                                    <span>English</span>
                                    <img src="../assets/img/lang/Eng.svg"></img>
                                </a>
                            </li>
                            <li>
                                <a @click="langRu" class="d-flex justify-content-between lang-btn">
                                    <span>Russian</span>
                                    <img src="../assets/img/lang/Ru.svg"></img>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item navbar dropdown-user dropdown">
                        <a class="nav-link hide-arrow" @click="showUserMenu">
                            <div v-if="user && user.personal_info && user.personal_info.avatar" class="avatar avatar-online">
                                <img :src="user.personal_info.avatar" alt class="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul class="user_menu" v-if="user_menu_show">
                            <li>
                                <a class="dropdown-item" href="#">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0 me-3">
                                            <div class="avatar avatar-online">
                                                <img :src="user.personal_info.avatar" alt class="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div class="flex-grow-1">
                                            <span class="fw-medium d-block">{{ user.personal_info.first_name + " " + user.personal_info.last_name}}</span>
                                            <small class="text-muted" style="text-transform: capitalize;">{{ user.role.name }}</small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <hr class="hr">
                            <li>
                                <router-link to="/accountsettings/account" class="dropdown-item menu-link">
                                    <i class="fa-solid fa-user menu-icon"></i>
                                    <span style="padding-left: 5px;" >{{ $t('user_menu.my_profile') }}</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/accountsettings/account" class="dropdown-item menu-link">
                                    <i class="fa fa-cogs menu-icon"></i>
                                    <span>{{ $t('user_menu.settings') }}</span>
                                </router-link>
                            </li>
                            <li>
                                <a @click="signOut" class="dropdown-item menu-link">
                                    <i class="fa fa-sign-out menu-icon"></i>
                                    <span style="padding-left: 5px;">{{ $t('user_menu.logout') }}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import { defaultLocale } from '@/lang';

export default {
    name: 'header-main',
    data () {
        return {
            user: {},
            lang_menu: false,
            mobile_menu: false,
            user_menu_show: false,
            language: localStorage.getItem('lang') || defaultLocale
        }
    },
    props: {
        showSideBar: {
            type: Function
        }
    },
    methods: {
        showUserMenu () {
            this.user_menu_show = !this.user_menu_show;

            if (this.user_menu_show) this.lang_menu = false;
        },

        showLangMenu () {
            this.lang_menu = !this.lang_menu;
          
            if (this.lang_menu) this.user_menu_show = false;
        },

        signOut () {
            if ( localStorage.getItem('token') != undefined | null) {
                localStorage.removeItem('token');
            }             
            if ( localStorage.getItem('user') != undefined | null) {
                localStorage.removeItem('user');
            }

            this.$router.push('/signin');
        },
        
        getUser () {
            if ( localStorage.getItem('user') != undefined | null) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
        },

        langUz() {
            localStorage.setItem('lang', 'uz');

            this.language = 'uz';

            this.$i18n.locale = 'uz';
            
            this.lang_menu = !this.lang_menu;
        },

        langRu() {
            localStorage.setItem('lang', 'ru');

            this.language = 'ru';

            this.$i18n.locale = 'ru';
            
            this.lang_menu = !this.lang_menu;
        },

        langEn() {
            localStorage.setItem('lang', 'en');

            this.language = 'en';

            this.$i18n.locale = 'en';

            this.lang_menu = !this.lang_menu;
        }
    },
    mounted () {
        this.getUser();
    }
}   
</script>

<style>
.user_menu {
    width: 230px;
    height: auto;
    position: absolute;
    margin-top: 340px;
    margin-left: -180px;
    background-color: #fff;
    box-shadow: 2px 2px 14px;
    padding: 24px 0px 24px 0px;
    list-style: none;
    border-radius: 8px;
    z-index: 27 !important;
}

.lang_menu {
    width: 150px;
    height: auto;
    position: absolute;
    margin-top: 180px;
    margin-left: -100px;
    background-color: #fff;
    box-shadow: 2px 2px 14px;
    padding: 20px 0px;
    list-style: none;
    border-radius: 8px;
    z-index: 27 !important;
}

.hr {
    border: 1px solid ;
}

.user_menu > li {
    padding: 8px 24px;
}

.user_menu > li:hover {
    background-color: #F8F8F9
}

@media screen and (min-width: 1201px) {
    .fa-list {
        display: none !important;
    }
}

.lang-btn {
    padding: 6px 24px;
    border-radius: 3px;
}

.lang-btn:hover {
    transform: scale(1.004);
    background-color: rgb(0, 0, 0, 0.1);
}

/* Общие стили для меню */
.menu-link {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    color: #697A8D;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
}

.menu-link:hover {
    background-color: #f5f5f5;
    color: #333;
}

/* Стили для иконок */
.menu-icon {
    margin-right: 8px;
}

/* Активное состояние */
.menu-link.active {
    background-color: #dcdcdc;
    color: #333;
}
</style>