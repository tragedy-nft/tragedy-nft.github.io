/**
 * Shared translations used across multiple pages
 * These are common UI elements, wallet messages, and network-related translations
 */

const sharedTranslations = {
  // Wallet states and errors
  wallet: {
    connected: {
      en: 'Wallet Connected',
      ja: 'ウォレット接続済み',
      zh: '钱包已连接',
      ko: '지갑 연결됨',
      es: 'Billetera Conectada',
      fr: 'Portefeuille Connecté',
      de: 'Wallet Verbunden'
    },
    notConnected: {
      en: 'Wallet Not Connected',
      ja: 'ウォレット未接続',
      zh: '钱包未连接',
      ko: '지갑 연결 안됨',
      es: 'Billetera No Conectada',
      fr: 'Portefeuille Non Connecté',
      de: 'Wallet Nicht Verbunden'
    },
    errors: {
      noWallet: {
        en: 'MetaMask not detected. Please install MetaMask wallet.',
        ja: 'MetaMaskが検出されませんでした。MetaMaskウォレットをインストールしてください。',
        zh: '未检测到MetaMask。请安装MetaMask钱包。',
        ko: 'MetaMask가 감지되지 않았습니다. MetaMask 지갑을 설치해주세요.',
        es: 'No se detectó MetaMask. Por favor instale la billetera MetaMask.',
        fr: 'MetaMask non détecté. Veuillez installer le portefeuille MetaMask.',
        de: 'MetaMask nicht erkannt. Bitte installieren Sie die MetaMask-Wallet.'
      },
      connectionFailed: {
        en: 'Wallet connection failed. Please try again.',
        ja: 'ウォレット接続に失敗しました。もう一度お試しください。',
        zh: '钱包连接失败。请再试一次。',
        ko: '지갑 연결에 실패했습니다. 다시 시도해주세요.',
        es: 'La conexión de la billetera falló. Por favor intente nuevamente.',
        fr: 'La connexion du portefeuille a échoué. Veuillez réessayer.',
        de: 'Wallet-Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.'
      },
      transactionRejected: {
        en: 'Transaction rejected by user',
        ja: 'トランザクションがユーザーによって拒否されました',
        zh: '用户拒绝了交易',
        ko: '사용자가 트랜잭션을 거부했습니다',
        es: 'Transacción rechazada por el usuario',
        fr: 'Transaction rejetée par l\'utilisateur',
        de: 'Transaktion vom Benutzer abgelehnt'
      },
      insufficientFunds: {
        en: 'Insufficient funds for transaction',
        ja: '残高不足です',
        zh: '余额不足',
        ko: '잔액이 부족합니다',
        es: 'Fondos insuficientes para la transacción',
        fr: 'Fonds insuffisants pour la transaction',
        de: 'Unzureichende Mittel für die Transaktion'
      }
    }
  },

  // Network-related messages
  network: {
    switching: {
      en: 'Switching network...',
      ja: 'ネットワーク切り替え中...',
      zh: '切换网络中...',
      ko: '네트워크 전환 중...',
      es: 'Cambiando de red...',
      fr: 'Changement de réseau...',
      de: 'Netzwerk wird gewechselt...'
    },
    switchFailed: {
      en: 'Network switch failed. Please change network manually.',
      ja: 'ネットワーク切り替えに失敗しました。手動で変更してください。',
      zh: '网络切换失败。请手动更改网络。',
      ko: '네트워크 전환에 실패했습니다. 수동으로 변경해주세요.',
      es: 'El cambio de red falló. Por favor cambie la red manualmente.',
      fr: 'Le changement de réseau a échoué. Veuillez changer de réseau manuellement.',
      de: 'Netzwerkwechsel fehlgeschlagen. Bitte wechseln Sie das Netzwerk manuell.'
    },
    addFailed: {
      en: 'Failed to add network. Please add manually.',
      ja: 'ネットワークの追加に失敗しました。手動で追加してください。',
      zh: '添加网络失败。请手动添加。',
      ko: '네트워크 추가에 실패했습니다. 수동으로 추가해주세요.',
      es: 'Error al agregar la red. Por favor agregue manualmente.',
      fr: 'Échec de l\'ajout du réseau. Veuillez ajouter manuellement.',
      de: 'Netzwerk hinzufügen fehlgeschlagen. Bitte manuell hinzufügen.'
    },
    polygon: {
      name: {
        en: 'Polygon Network',
        ja: 'Polygonネットワーク',
        zh: 'Polygon网络',
        ko: 'Polygon 네트워크',
        es: 'Red Polygon',
        fr: 'Réseau Polygon',
        de: 'Polygon-Netzwerk'
      },
      required: {
        en: 'Please switch to Polygon network',
        ja: 'Polygonネットワークに切り替えてください',
        zh: '请切换到Polygon网络',
        ko: 'Polygon 네트워크로 전환해주세요',
        es: 'Por favor cambie a la red Polygon',
        fr: 'Veuillez passer au réseau Polygon',
        de: 'Bitte wechseln Sie zum Polygon-Netzwerk'
      }
    }
  },

  // Common UI elements
  ui: {
    buttons: {
      back: {
        en: '← Back',
        ja: '← 戻る',
        zh: '← 返回',
        ko: '← 뒤로',
        es: '← Volver',
        fr: '← Retour',
        de: '← Zurück'
      },
      continue: {
        en: 'Continue',
        ja: '続ける',
        zh: '继续',
        ko: '계속',
        es: 'Continuar',
        fr: 'Continuer',
        de: 'Weiter'
      },
      cancel: {
        en: 'Cancel',
        ja: 'キャンセル',
        zh: '取消',
        ko: '취소',
        es: 'Cancelar',
        fr: 'Annuler',
        de: 'Abbrechen'
      },
      confirm: {
        en: 'Confirm',
        ja: '確認',
        zh: '确认',
        ko: '확인',
        es: 'Confirmar',
        fr: 'Confirmer',
        de: 'Bestätigen'
      },
      close: {
        en: 'Close',
        ja: '閉じる',
        zh: '关闭',
        ko: '닫기',
        es: 'Cerrar',
        fr: 'Fermer',
        de: 'Schließen'
      }
    },
    states: {
      loading: {
        en: 'Loading...',
        ja: '読み込み中...',
        zh: '加载中...',
        ko: '로딩 중...',
        es: 'Cargando...',
        fr: 'Chargement...',
        de: 'Wird geladen...'
      },
      processing: {
        en: 'Processing...',
        ja: '処理中...',
        zh: '处理中...',
        ko: '처리 중...',
        es: 'Procesando...',
        fr: 'Traitement...',
        de: 'Verarbeitung...'
      },
      success: {
        en: 'Success!',
        ja: '成功！',
        zh: '成功！',
        ko: '성공!',
        es: '¡Éxito!',
        fr: 'Succès !',
        de: 'Erfolg!'
      },
      failed: {
        en: 'Failed',
        ja: '失敗',
        zh: '失败',
        ko: '실패',
        es: 'Falló',
        fr: 'Échec',
        de: 'Fehlgeschlagen'
      },
      error: {
        en: 'Error',
        ja: 'エラー',
        zh: '错误',
        ko: '오류',
        es: 'Error',
        fr: 'Erreur',
        de: 'Fehler'
      }
    }
  },

  // MetaMask specific
  metamask: {
    required: {
      en: 'MetaMask Required',
      ja: 'MetaMaskが必要です',
      zh: '需要MetaMask',
      ko: 'MetaMask 필요',
      es: 'Se requiere MetaMask',
      fr: 'MetaMask requis',
      de: 'MetaMask erforderlich'
    },
    install: {
      en: 'Please install MetaMask',
      ja: 'MetaMaskをインストールしてください',
      zh: '请安装MetaMask',
      ko: 'MetaMask를 설치해주세요',
      es: 'Por favor instale MetaMask',
      fr: 'Veuillez installer MetaMask',
      de: 'Bitte installieren Sie MetaMask'
    }
  },

  // Transaction-related
  transaction: {
    pending: {
      en: 'Transaction pending...',
      ja: 'トランザクション処理中...',
      zh: '交易处理中...',
      ko: '트랜잭션 대기 중...',
      es: 'Transacción pendiente...',
      fr: 'Transaction en attente...',
      de: 'Transaktion ausstehend...'
    },
    confirmed: {
      en: 'Transaction confirmed',
      ja: 'トランザクション確認済み',
      zh: '交易已确认',
      ko: '트랜잭션 확인됨',
      es: 'Transacción confirmada',
      fr: 'Transaction confirmée',
      de: 'Transaktion bestätigt'
    },
    failed: {
      en: 'Transaction failed',
      ja: 'トランザクション失敗',
      zh: '交易失败',
      ko: '트랜잭션 실패',
      es: 'Transacción fallida',
      fr: 'Transaction échouée',
      de: 'Transaktion fehlgeschlagen'
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sharedTranslations;
}