import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Typography, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import moment from "moment";

import CardVisibilityToggle from "../cardVisibilityToggle/CardVisibilityToggle";
import EditCardButton from "../editCardButton/EditCardButton";

const { Text } = Typography;

const ProfileCardsView = ({
  editUrl,
  titleId,
  id,
  content,
  style,
  type,
  visible,
  visibleCards,
  cardName,
  lastUpdated,
}) => {
  const generateSwitchButton = () =>
    type && (
      <Row>
        <Col>
          <CardVisibilityToggle
            visibleCards={visibleCards}
            cardName={cardName}
          />
        </Col>
        <Col style={{ marginLeft: 20 }}>
          <EditCardButton editUrl={editUrl} />
        </Col>
      </Row>
    );

  const grayedOut = {
    backgroundColor: visible ? "" : "#D3D3D3",
  };

  return (
    <div>
      <Card
        className={content === null ? "no-content-card" : null}
        title={
          <>
            {typeof titleId === "string" ? (
              <FormattedMessage id={titleId} />
            ) : (
              titleId
            )}
            {lastUpdated && (
              <Tooltip title={<FormattedMessage id="profile.last.updated" />}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontStyle: "italic",
                    fontWeight: "normal",
                  }}
                  type="secondary"
                >
                  {moment(lastUpdated).format("LL")}
                </Text>
              </Tooltip>
            )}
          </>
        }
        id={id}
        extra={generateSwitchButton()}
        style={(style, grayedOut)}
      >
        {content}
      </Card>
    </div>
  );
};

ProfileCardsView.propTypes = {
  editUrl: PropTypes.string,
  titleId: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.element,
  style: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.bool,
  visible: PropTypes.bool,
  cardName: PropTypes.string.isRequired,
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ),
  lastUpdated: PropTypes.string,
};

ProfileCardsView.defaultProps = {
  style: undefined,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
  visibleCards: {},
  lastUpdated: null,
};

export default ProfileCardsView;
