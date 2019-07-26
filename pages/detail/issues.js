import { useState, useCallback, useEffect } from 'react';
import { Avatar, Button, Select, Spin } from 'antd';

import { getLastUpdated } from '../../lib/utils';

import withRepoBasic from '../../components/with-repo-basic';
import SearchUser from '../../components/SearchUser';

import MDRenderer from '../../components/MarkdownRenderer';

import api from '../../lib/api';

const CACHE = {};

function IssueDetail({ issue }) {
    return (
        <div className="root">
            <MDRenderer content={issue.body} />
            <div className="actions">
                <Button href={issue.html_url} target="_blank">
                    打开Issue讨论页面
                </Button>
            </div>
            <style jsx>{`
                .root {
                    background: #fefefe;
                    padding: 20px;
                }
                .actions {
                    text-align: right;
                }
            `}</style>
        </div>
    );
}

function IssueItem({ issue }) {
    const [showDetail, setShowDetail] = useState(false);

    const toggleShowDetail = useCallback(() => {
        setShowDetail(detail => !detail);
    }, []);

    return (
      <div>
        <div className="issue">
          <Button
            type="primary"
            size="small"
            style={{ position: "absolute", right: 10, top: 10 }}
            onClick={toggleShowDetail}
          >
            {showDetail ? "隐藏" : "查看"}
          </Button>
          <div className="avatar">
            <Avatar src={issue.user.avatar_url} shape="square" size={50} />
          </div>
          <div className="main-info">
            <h6>
              <span>{issue.title}</span>
              {issue.labels.map(label => (
                <Label label={label} key={label.id} />
              ))}
            </h6>
            <p className="sub-info">
              <span>Updated at {getLastUpdated(issue.updated_at)}</span>
            </p>
          </div>
          <style jsx>{`
            .issue {
              display: flex;
              position: relative;
              padding: 10px;
            }
            .issue:hover {
              background: #fafafa;
            }
            .issue + .issue {
              border-top: 1px solid #eee;
            }
            .main-info > h6 {
              max-width: 600px;
              font-size: 16px;
              padding-right: 40px;
            }
            .avatar {
              margin-right: 20px;
            }
            .sub-info {
              margin-bottom: 0;
            }
            .sub-info > span + span {
              display: inline-block;
              margin-left: 20px;
              font-size: 12px;
            }
          `}</style>
        </div>
        {showDetail ? <IssueDetail issue={issue} /> : null}
      </div>
    );
}

function makeQuery(creator, state, labels) {

}