import React, { Component } from 'react';
import './SafeBoxWrapper.scss';
import { connect } from 'react-redux';
import SafeBoxScreen from '../safe-box-screen/SafeBoxScreen';
import { addKeyAction, goIdleAction, goToServiceModeAction, locking, unlocking, validateMasterCode } from '../../../redux/deposit-box/actions';
import keypads from '../../../app/consts/keypads';
import SafeBoxKey from '../safe-box-key/SafeBoxKey';
import globals from '../../../app/consts/conf';

class SafeBoxWrapper extends Component {
  constructor() {
    super();
    this.sceenLightOff = null;
    this.inputSubmit = null;
  }

  handleKeyBoardInputs = event => {
    const key = event.key.toUpperCase();
    if (keypads.toString().indexOf(key) !== -1) {
      this.addKey(key);
    }
  };

  addKey = key => {
    const { addKeyAction, depositBox } = this.props;
    const { serviceMode, loading } = depositBox;
    if (loading) return;

    if (!serviceMode && !isNaN(key)) {
      addKeyAction && addKeyAction(key);
    } else if (serviceMode) {
      addKeyAction && addKeyAction(key);
    }

    clearTimeout(this.inputSubmit);

    if (!serviceMode && key === 'L') {
      this.keySubmit();
      this.checkServiceMode();
    } else {
      this.inputSubmit = setTimeout(() => {
        this.checkServiceMode();
        this.keySubmit();
        this.validateMasterCode();
      }, globals.inputDelayTimeout);
    }
  };

  keySubmit() {
    const { locking, unlocking, depositBox } = this.props;
    const { password, savedPassword, lock, serviceMode } = depositBox;
    if (!serviceMode && password.length === 6) {
      if (!lock) {
        locking && locking(password);
      } else {
        unlocking && unlocking(savedPassword, password);
      }
    }
  }

  checkServiceMode() {
    const { depositBox, goToServiceModeAction } = this.props;
    const { password, serviceMode, lock } = depositBox;

    if (lock && !serviceMode && password.length === 6 && password === '000000') {
      goToServiceModeAction && goToServiceModeAction();
    }
  }

  validateMasterCode() {
    const { depositBox, validateMasterCode } = this.props;
    const { password, serviceMode, lock, sn } = depositBox;

    if (lock && serviceMode && password.length >= 12) {
      const areUnique = [...new Set(password.split(''))]; // just check if whole arr is unique
      if (areUnique.length === 12) {
        validateMasterCode && validateMasterCode(password, sn);
      }
    }
  }

  checkIdleState() {
    const { goIdleAction } = this.props;

    clearTimeout(this.sceenLightOff);
    this.sceenLightOff = setTimeout(() => {
      goIdleAction && goIdleAction();
    }, globals.screenLightTimeout);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyBoardInputs);
  }

  render() {
    const { depositBox } = this.props;
    const { lock, status, password, idle, loading, sn } = depositBox;

    if (!idle) {
      this.checkIdleState();
    }

    return (
      <div className="sdb--wrapper">
        <SafeBoxScreen lock={lock} status={status} password={password} idle={idle} />
        <div className="sdb--wrapper--keyboard">
          {keypads.map((item, index) => (
            <SafeBoxKey key={index} padKey={item} disabled={loading} keyAction={this.addKey} />
          ))}
        </div>
        <p className="sdb--wrapper--serial-number">S/N: {sn}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  depositBox: state.depositBox,
});

const mapDispatchToProps = {
  goToServiceModeAction,
  validateMasterCode,
  addKeyAction,
  locking,
  unlocking,
  goIdleAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SafeBoxWrapper);
