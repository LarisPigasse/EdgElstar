import React from 'react'
import authRoute from './authRoute'
import { ADMIN, OPERATORE, ROOT } from '../../constants/roles.constant'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [ADMIN,OPERATORE,ROOT],
    },
    {
        key: 'tracking.spedizioni',
        path: '/tracking/spedizioni/',
        component: React.lazy(() => import('views/tracking/Spedizioni')),
        authority: [ADMIN,OPERATORE,ROOT],
    },
    {
        key: 'tracking.archivio',
        path: '/tracking/archivio',
        component: React.lazy(() => import('views/tracking/Archivio')),
        authority: [ADMIN,OPERATORE,ROOT],
    },
    {
        key: 'tracking.update',
        path: '/tracking/aggiorna-spedizioni',
        component: React.lazy(() => import('views/tracking/AggiornaSpedizioni')),
        authority: [ADMIN,OPERATORE,ROOT],
    },
    {
        key: 'tracking.spedizioni.new',
        path: '/tracking/spedizioni-new',
        component: React.lazy(() => import('views/tracking/SpedizioniNew')),
        authority: [ADMIN,OPERATORE,ROOT],
    },
    {
        key: 'tracking.spedizioni.edit',
        path: '/tracking/spedizioni-edit/:spedizioneId',
        component: React.lazy(() => import('views/tracking/SpedizioniEdit')),
        authority: [ADMIN,OPERATORE,ROOT],
    },          
    {
        key: 'crm.clienti',
        path: '/crm/clienti/',
        component: React.lazy(() => import('views/crm/Clienti')),
        authority: [ADMIN,OPERATORE,ROOT],
    },               
    {
        key: 'logistica.corrieri',
        path: '/logistica/corrieri/',
        component: React.lazy(() => import('views/logistica/Corrieri')),
        authority: [ADMIN,OPERATORE,ROOT],
    },
    {
        key: 'logistica.magazzino',
        path: '/logistica/magazzino/',
        component: React.lazy(() => import('views/logistica/Magazzino')),
        authority: [ADMIN,OPERATORE],
    },           
    {
        key: 'sistema.configurazione',
        path: '/sistema/configurazione/',
        component: React.lazy(() => import('views/sistema/Configurazione')),
        authority: [ADMIN,OPERATORE,ROOT],
    },
    {
        key: 'sistema.account',
        path: '/sistema/account/',
        component: React.lazy(() => import('views/sistema/Account')),
        authority: [ADMIN,OPERATORE,ROOT],
    }, 
    {
        key: 'sistema.operatori',
        path: '/sistema/operatori/',
        component: React.lazy(() => import('views/sistema/Operatori')),
        authority: [ADMIN,OPERATORE,ROOT],
    },    
    {
        key: 'sistema.tabelle',
        path: '/sistema/tabelle/',
        component: React.lazy(() => import('views/sistema/Tabelle')),
        authority: [ADMIN,OPERATORE,ROOT],
    },                  
]
