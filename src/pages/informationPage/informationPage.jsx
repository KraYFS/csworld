import { useTranslation } from 'react-i18next';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SectionTitle from "../../Ui/SectionTitle/sectionTitle";
import Spoiler from "../../Ui/spoiler/spoiler";
import { useParams } from "react-router-dom";

const InformationPage = () => {
    const { name } = useParams()
    const { t, i18n } = useTranslation();

    if (name === 'User agreement') {
        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('userAgreementTitle')} />
                        <Spoiler post text={t('userAgreementText')} title=' .' />
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
                        <Spoiler post text={t('PrivacyText')} title=' .' />
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

export default InformationPage;
