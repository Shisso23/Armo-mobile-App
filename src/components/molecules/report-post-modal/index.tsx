import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { ActivityIndicator, Menu } from 'react-native-paper';
import { Icon, ListItem, Text } from 'react-native-elements';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

type ReportPostModalProps = {
  handleReport: Function;
  onDismiss: Function;
  visible: boolean;
  style?: any;
  loading: boolean;
};

const ReportPostModal: React.FC<ReportPostModalProps> = ({
  handleReport,
  visible = false,
  onDismiss,
  style = {},
  loading = false,
}) => {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const { Gutters, Layout } = useTheme();

  const hideReportModal = () => {
    setReportModalVisible(false);
    onDismiss();
  };

  useEffect(() => {
    setReportModalVisible(visible);
  }, [visible]);

  const renderReportingReason = (reason: string) => {
    return (
      <TouchableOpacity style={Gutters.regularMargin} onPress={() => handleReport(reason)}>
        <Text>{reason}</Text>
      </TouchableOpacity>
    );
  };

  const _onDismiss = () => {
    hideReportModal();
    onDismiss();
  };

  return (
    <>
      <Menu
        style={[Layout.alignSelfCenter, styles.menu, style]}
        visible={reportModalVisible}
        onDismiss={_onDismiss}
        anchor={<Text />}
        contentStyle={styles.reportMenuContent}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.reportMenuTitle}>Reason</ListItem.Title>
          </ListItem.Content>
          <Icon name="md-close-circle-outline" type="ionicon" onPress={hideReportModal} />
        </ListItem>
        <ScrollView>
          <ActivityIndicator
            animating={loading}
            color={Colors.lightGray}
            style={styles.loadingIndicator}
            size={25}
          />
          {renderReportingReason('Spam')}
          {renderReportingReason('Hatred and Bullying')}
          {renderReportingReason('False Information')}
          {renderReportingReason('Self Promoting')}
          {renderReportingReason("I just don't like it")}
        </ScrollView>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    alignSelf: 'center',
    position: 'absolute',
  },
  menu: {
    ...Platform.select({
      android: { backgroundColor: Colors.transparent },
      ios: {},
    }),
    borderRadius: 15,
    height: 300,
    marginBottom: 100,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    top: '35%',
    width: '80%',
  },
  reportMenuContent: {
    borderRadius: 15,
    height: '100%',
    width: '100%',
  },
  reportMenuTitle: { fontWeight: Platform.OS === 'ios' ? '500' : 'bold' },
});
export default ReportPostModal;
