import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SectionTitle from "../../Ui/SectionTitle/sectionTitle";
import Spoiler from "../../Ui/spoiler/spoiler";
import { useParams } from "react-router-dom";

const InformationPage = () => {
    const { name } = useParams()
    const { t, i18n } = useTranslation();

    const checkParagraph = (text) => {
        return text.split('%$20').map((paragraph, index) => {
            return <React.Fragment key={index}>
                {paragraph}
                <br />
            </React.Fragment>
        })
    }

    if (name === 'User agreement') {
        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('userAgreementTitle')} />
                        <Spoiler post text={checkParagraph(t('userAgreementText'))} title=' .' />
                    </section>
                </div>
                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('PrivacyTitle')} />
                        <Spoiler post text={checkParagraph(t('PrivacyText'))} title=' .' />
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

export default InformationPage;
