import {
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

import { ADMIN, ROOT, CLIENTE, OPERATORE } from '../../constants/roles.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
        colore: 'text-red-500'
    },

    {
        key: 'tracking',
        colore: 'text-red-500',
        path: '',
        title: 'Tracking',
        translateKey: 'nav.tracking',
        icon: 'monitor',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [         
            {
                key: 'tracking.spedizioni',
                path: '/tracking/spedizioni',
                title: 'Spedizioni',
                translateKey: 'nav.tracking.spedizioni',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN,OPERATORE],
                subMenu: [],
            }, 
            {
                key: 'tracking.update',
                path: '/tracking/aggiorna-spedizioni',
                title: 'Aggiorna spedizioni',
                translateKey: 'nav.tracking.update',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN,OPERATORE],
                subMenu: [],
            },
            {
                key: 'tracking.spedizioni.clienti',
                path: '/tracking/spedizioni-clienti',
                title: 'Spedizioni cliente',
                translateKey: 'nav.tracking.spedizioni.clienti',
                icon: '',
                stato: 'ATTIVO',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [CLIENTE],
                subMenu: [],
            },
        ],
    },    
    {
        key: 'crm',
        path: '',
        title: 'Crm',
        translateKey: 'nav.crm',
        icon: 'crm',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'crm.dashboard',
                path: '/crm/dashboard/',
                title: 'Dashboard',
                translateKey: 'nav.crm.dashboard',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'crm.calendario',
                path: '/crm/calendario/',
                title: 'Calendario',
                translateKey: 'nav.crm.calendario',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'crm.clienti',
                path: '/crm/clienti/',
                title: 'Clienti',
                translateKey: 'nav.crm.clienti',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },              
            {
                key: 'crm.mailbox',
                path: '/crm/mailbox/',
                title: 'Mailbox',
                translateKey: 'nav.crm.mailbox',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }, 
            {
                key: 'crm.comunica',
                path: '/crm/comunica/',
                title: 'Comunica',
                translateKey: 'nav.crm.comunica',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ROOT],
                subMenu: [],
            },                                                           
        ],
    },
    {
        key: 'logistica',
        path: '',
        title: 'Logistica',
        translateKey: 'nav.logistica',
        icon: 'admin',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'logistica.corrieri',
                path: '/logistica/corrieri/',
                title: 'Corrieri',
                translateKey: 'nav.logistica.corrieri',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }, 
            {
                key: 'logistica.magazzino',
                path: '/logistica/magazzino/',
                title: 'Magazzino',
                translateKey: 'nav.logistica.magazzino',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },                                               
        ],
    },    
    {
        key: 'admin',
        path: '',
        title: 'Amministrazione',
        translateKey: 'nav.admin',
        icon: 'stat',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [         
            {
                key: 'admin.documenti',
                path: '/amministrazione/documenti/',
                title: 'Documenti e fatture',
                translateKey: 'nav.admin.documenti',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }, 
            {
                key: 'admin.pagamenti',
                path: '/amministrazione/pagamenti/',
                title: 'Pagamenti',
                translateKey: 'nav.admin.pagamenti',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },                        
        ],
    }, 
    {
        key: 'sistema',
        path: '',
        title: 'Sistema',
        translateKey: 'nav.sistema',
        icon: 'setup',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [         
            {
                key: 'sistema.configurazione',
                path: '/sistema/configurazione/',
                title: 'Configurazione',
                translateKey: 'nav.sistema.configurazione',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'sistema.account',
                path: '/sistema/account/',
                title: 'Account',
                translateKey: 'nav.sistema.account',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'sistema.operatori',
                path: '/sistema/operatori/',
                title: 'Operatori',
                translateKey: 'nav.sistema.operatori',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },           
            {
                key: 'sistema.statistiche',
                path: '/sistema/statistiche/',
                title: 'Report e Statistiche',
                translateKey: 'nav.sistema.statistiche',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },                                     
            {
                key: 'sistema.tabelle',
                path: '/sistema/tabelle/',
                title: 'Tabelle di base',
                translateKey: 'nav.sistema.tabelle',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },                          
        ],
    },

]

export default navigationConfig
