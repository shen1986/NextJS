import { memo, isValidElement, useEffect } from 'react';
import { withRouter } from 'next/router';
import { Row, Col, List, Pagination } from 'antd';
import Link from 'next/link';

import Repo from '../components/Repo';
import { cacheArray } from '../lib/resp-basic-cache';

const api = require('../lib/api');

const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust'];
const SORT_TYPES = [
    {
        name: 'Best Match',
    },
    {
        name: 'Most Stars',
        value: 'stars',
        order: 'desc',
    },
    {
        name: 'Fewest Stars',
        value: 'stars',
        order: 'asc',
    },
    {
        name: 'Most Forks',
        value: 'forks',
        order: 'asc',
    },
];

/**
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库的项目开发主语言
 * page：分页页面
 */

const selectedItemStyle = {
    borderLeft: '2px solid #e36209',
    fontWeight: 100,
}

function noop() {}

const per_page = 20;

const isServer = typeof window === 'undefined';
const FilterLink = memo(({ name, query, lang, sort, order, page}) => {
    let queryString = `?query=${query}`;
    if (lang) {
        queryString += `&lang=${lang}`;
    }
    if (sort) {
        queryString += `&sort=${sort}&order=${order || 'desc'}`;
    }
    if (page) {
        queryString += `&page=${page}`
    }

    queryString += `per_page=${per_page}`;

    return (
        <Link href={`/search${queryString}`}>
            {isValidElement(name) ? name : <a>{name}</a>}
        </Link>
    )
});

function Search({ router, repos }) {
    const { ...querys } = router.query;
    const { lang, sort, order, page } = router.query;

    useEffect(() => {
        if (!isServer) {
            cacheArray(repos.items);
        }
    });

    return (
        <div className="root">
            <Row gutter={20} >
                <Col span={6} >
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={LANGUAGES}
                        renderItem={item => {
                            const selected = lang === item;

                            return (
                                <List.Item style={selected ? selectedItemStyle : null}>
                                    {selected ? (
                                        <span>{item}</span>
                                    ) : (
                                        <FilterLink {...querys} lang={item} name={item} />
                                    )}
                                </List.Item>
                            )
                        }}
                    ></List>
                </Col>
            </Row>
        </div>
    )
}