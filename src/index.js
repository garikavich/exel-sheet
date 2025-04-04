import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import './scss/index.scss'

const exel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
})
exel.render()
console.log('exel', exel)
