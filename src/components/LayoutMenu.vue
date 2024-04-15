<template>
    <aside id="layout-menu" class="layout-menu layout-menu-main  menu-vertical menu bg-menu-theme">
        <CSidebar>
            <CSidebarHeader class="border-bottom">
                <CSidebarBrand>
                    <router-link style="color: black; font-size: 20px; font-weight: 400;" to="/">Easy print</router-link>
                </CSidebarBrand>
            </CSidebarHeader>

            <CSidebarNav>
                <CNavItem href="/banner/index">
                    <i class="fa-solid fa-sheet-plastic me-3"></i> {{ $t('bar.banner') }}
                </CNavItem>
                <CNavItem href="/image/index">
                    <i class="fa-solid fa-image me-3"></i> {{ $t('bar.images') }}
                </CNavItem>
                <CNavItem href="/company/index">
                    <i class="fa fa-building me-3"></i> <span style="padding-left: 3px;">{{ $t('bar.companies') }}</span>
                </CNavItem>
                <CNavGroup>
                    <template #togglerContent>
                        <i class="fa fa-users me-3"></i> {{ $t('bar.users') }}
                    </template>
                    <CNavItem href="/user/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.users') }}
                    </CNavItem>
                    <CNavItem href="/role/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.roles') }}
                    </CNavItem>
                </CNavGroup>
                <CNavGroup>
                    <template #togglerContent>
                        <i class="fa fa-list-alt me-3"></i> {{ $t('bar.product') }}
                    </template>
                    <CNavItem href="/product/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.product') }}
                    </CNavItem>
                    <CNavItem href="/size/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.size') }}
                    </CNavItem>
                    <CNavItem href="/color/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.color') }}
                    </CNavItem>
                    <CNavItem href="/cupon/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.cupon') }}
                    </CNavItem>
                    <CNavItem href="/discount/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.discount') }}
                    </CNavItem>
                </CNavGroup>
                <CNavGroup>
                    <template #togglerContent>
                        <i class="fa fa-list-alt me-3"></i> {{ $t('bar.categories') }}
                    </template>
                    <CNavItem href="/category/index">
                        <span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ $t('bar.categories') }}
                    </CNavItem>
                    <CNavItem href="/sub-category/index">
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
    name: 'layout-menu',

    components: {
        CSidebar,
        CNavItem,
        CNavGroup,
        CSidebarNav,
        CSidebarBrand,
        CSidebarHeader
    }
};
</script>

<style>
.position-fx {
    position: fixed;
}

@media screen and (max-width: 1200px) {
    .layout-menu-main {
        display: none !important;
    }
}
</style>