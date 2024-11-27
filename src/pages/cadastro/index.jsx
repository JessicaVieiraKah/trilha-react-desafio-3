import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleSignup, SubtitleSignup, Row, Wrapper } from './styles';

const Cadastro = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.post('/users', formData);
            if (data.id) {
                navigate('/feed');
                return;
            }
            alert('Erro ao fazer cadastro');
        } catch (e) {
            alert('Erro inesperado. Tente novamente.');
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                        e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleSignup>Faça seu cadastro</TitleSignup>
                        <SubtitleSignup>Crie sua conta e faça parte da comunidade!</SubtitleSignup>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome" leftIcon={<MdPerson />} name="name" control={control} />
                            {errors.name && <span>Nome é obrigatório</span>}
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="password" control={control} />
                            {errors.password && <span>Senha é obrigatória</span>}
                            <Button title="Cadastrar" variant="secondary" type="submit" />
                        </form>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Cadastro };
               