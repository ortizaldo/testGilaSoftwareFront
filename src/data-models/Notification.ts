/**
 * Interface for Notification composition
 * @interface Notification
 * @param {any} options
 * @param {string} options['message']
 * @param {string} options['icon']
 * @param {string} options['title']
 * @param {string} options['url']
 * @param {string} options['target']
 * @param {any} settings
 * @param {string} settings['type']
 * @param {string} settings['element']
 * @param {string} settings['position']
 * @param {string} settings['allow_dismiss']
 * @param {string} settings['newest_on_top']
 * @param {any} settings['placement']
 * @param {string} settings['placement']['from']
 * @param {string} settings['placement']['align']
 * @param {number} settings['delay']
 * @param {number} settings['timer']
 * @param {any} settings['animate']
 * @param {string} settings['animate']['enter']
 * @param {string} settings['animate']['exit']
 * @param {string} settings['onClose']
 */
export interface Notification {
  options: {
    message: string;
    icon?: string;
    title?: string;
    url?: string;
    target?: string;
  };
  settings: {
    type: string;
    element?: string;
    position?: string;
    allow_dismiss?: string;
    newest_on_top?: string;
    placement?: {
      from: string;
      align: string;
    };
    delay?: number;
    timer?: number;
    animate?: {
      enter: string;
      exit: string;
    };
    onClose?: string;
  };
}
