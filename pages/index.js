import { useEffect } from 'react';
import { Button, Icon, Tabs } from 'antd';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';

import Repo from '../components/Repo';
import { cacheArray } from '../lib/resp-basic-cache';

const api = require('../lib/api');

const { publicRuntimeConfig } = getConfig();

let cacheUserRepos, cachedUserStareRepos;

const isServer = typeof window === 'undefined'

function Index({ userRepos, userStaredRepos, user, router }) {
    const tabKey = router.query.key || '1';

    const handleTabChange = activeKey => {
        Router.push(`/?key=${activeKey}`);
    }

    useEffect(() => {
      if (!isServer) {
        cachedUserRepos = userRepos;
        cachedUserStareRepos = userStaredRepos;

        if (userRepos) {
          cache.set("userRepos", userRepos);
        }
        if (userStaredRepos) {
          cache.set("userStaredRepos", userStaredRepos);
        }

        // const timeout = setTimeout(() => {
        // cachedUserRepos = null;
        // cachedUserStaredRepos = null;
        // }, 1000 * 60 * 10);
      }
    }, [userRepos, userStaredRepos]);

    useEffect(() => {
        if (!isServer) {
            cachedArray(userRepos);
            cacheArray(userStaredRepos)
        }
    });

    if (!user || !user.id) {
        return (
            <div className="root">
                <p>亲，您还没有登录哦~</p>
                <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
                    点击登录
                </Button>
                <style jsx>{`
                    .root {
                        height: 400px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                `}</style>
            </div>
        )
    }

    return (
        <div className="root">
            <div className="user-info">
                <img src={user.avatar_url} alt="user avatar" className="avatar"/>
                <span className="login">{user.login}</span>
                <span className="name">{user.name}</span>
                <span className="bio">{user.bio}</span>
                <p className="email">
                    <Icon type="mail" style={{ marginRight: 10 }} />
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
            </div>
            <div className="user-repos">
                <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
                    
                </Tabs>
            </div>
        </div>
    )
}