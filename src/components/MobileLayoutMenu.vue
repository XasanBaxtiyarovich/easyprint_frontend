<template>
    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme" style="box-shadow: 4px 4px 20px rgb(0, 0, 0, 0.2);">
        <CSidebar>
            <CSidebarHeader class="border-bottom">
                <CSidebarBrand @click="closeSideBar">
                    <router-link style="color: black; font-size: 20px; font-weight: 400;" to="/">Easy print</router-link>
                </CSidebarBrand>
                <a style="text-align: end;" @click="closeSideBar">
                    <i class="fa fa-angle-left"></i>
                </a>
            </CSidebarHeader>

            <CSidebarNav>
                <CNavItem href="/banner/index" @click="closeSideBar">
                    <i class="fa-solid fa-sheet-plastic me-3"></i> {{ $t('bar.banner') }}
                </CNavItem>
                <CNavItem href="/image/index" @click="closeSideBar">
                    <i class="fa-solid fa-image me-3"></i> {{ $t('bar.images') }}
                </CNavItem>
                <CNavItem href="/company/index" @click="closeSideBar">
                    <i class="fa fa-building me-3"></i> <span style="padding-left: 3px;">{{ $t('bar.companies') }}</span>
                </CNavItem>
                <CNavGroup>
                    <template #togglerContent @click="closeSideBar">
                        <i class="fa fa-users me-3"></i> {{ $t('bar.users') }}
                    </template>
                    <CNavItem href="/user/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.users') }}
                    </CNavItem>
                    <CNavItem href="/role/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.roles') }}
                    </CNavItem>
                </CNavGroup>
                <CNavGroup>
                    <template #togglerContent>
                        <i class="fa fa-list-alt me-3"></i> {{ $t('bar.product') }}
                    </template>
                    <CNavItem href="/product/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.product') }}
                    </CNavItem>
                    <CNavItem href="/size/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.size') }}
                    </CNavItem>
                    <CNavItem href="/color/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.color') }}
                    </CNavItem>
                    <CNavItem href="/cupon/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.cupon') }}
                    </CNavItem>
                    <CNavItem href="/discount/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.discount') }}
                    </CNavItem>
                </CNavGroup>
                <CNavGroup>
                    <template #togglerContent>
                        <i class="fa fa-list-alt me-3"></i> {{ $t('bar.categories') }}
                    </template>
                    <CNavItem href="/category/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.categories') }}
                    </CNavItem>
                    <CNavItem href="/sub-category/index" @click="closeSideBar">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.sub-category') }}
                    </CNavItem>
                </CNavGroup>
            </CSidebarNav>
        </CSidebar>
    </aside>
</template>

<script>
import { CSidebar, CSidebarHeader, CSidebarNav, CSidebarBrand, CNavItem, CNavGroup } from '@coreui/vue';

export default {
    name: 'layout-menu-mobile',

    components: {
        CSidebar,
        CNavItem,
        CNavGroup,
        CSidebarNav,
        CSidebarBrand,
        CSidebarHeader
    },
    props: {
        closeSideBar: {
            type: Function
        }
    },
};
</script>

<style>
.position-fx {
    position: fixed;
}
</style>