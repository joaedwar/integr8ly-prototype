import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

class AsciiDocTemplate extends React.Component {
  state = { loaded: false, html: null };

  componentDidMount() {
    const { i18n, template } = this.props;
    fetch(`asciidocs/${i18n.language}/${template}`)
      .then(res => res.text())
      .then(html => {
        this.setState({ loaded: true, html });
      });
  }

  render() {
    const { loaded, html } = this.state;
    if (loaded) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return null;
  }
}

AsciiDocTemplate.propTypes = {
  i18n: PropTypes.object.isRequired,
  template: PropTypes.string.isRequired
};

const ConnectedAsciiDocTemplate = translate()(AsciiDocTemplate);

export { ConnectedAsciiDocTemplate as default, AsciiDocTemplate };
