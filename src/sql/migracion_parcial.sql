--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-11-20 18:23:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 22995)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 34049)
-- Name: appointments_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    datetime timestamp without time zone NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    motive character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "doctorId" uuid
);


ALTER TABLE public.appointments_entity OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 34038)
-- Name: role_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_name character varying NOT NULL,
    description character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.role_entity OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 34059)
-- Name: user_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    phone bigint,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_entity OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34069)
-- Name: user_entity_roles_role_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_entity_roles_role_entity (
    "userEntityId" uuid NOT NULL,
    "roleEntityId" uuid NOT NULL
);


ALTER TABLE public.user_entity_roles_role_entity OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 34049)
-- Dependencies: 219
-- Data for Name: appointments_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4933 (class 0 OID 34038)
-- Dependencies: 218
-- Data for Name: role_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role_entity VALUES ('550e8400-e29b-41d4-a716-446655440001', 'admin', 'Administrator with full system access', '2025-11-20 18:22:24.793899');
INSERT INTO public.role_entity VALUES ('550e8400-e29b-41d4-a716-446655440002', 'paciente', 'Regular user with limited access', '2025-11-20 18:22:24.793899');
INSERT INTO public.role_entity VALUES ('550e8400-e29b-41d4-a716-446655440003', 'doctor', 'Moderator with content management permissions', '2025-11-20 18:22:24.793899');


--
-- TOC entry 4935 (class 0 OID 34059)
-- Dependencies: 220
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_entity VALUES ('650e8400-e29b-41d4-a716-446655440001', 'juan.perez@example.com', '$2b$10$2cbr5qj9akmkAnfBLwnIN.LCbfdfX2IUvM7XPjW7sxeyiZV3dTNLy', 'Juan Pérez', 3001234567, true, '2025-11-20 18:22:24.793899');
INSERT INTO public.user_entity VALUES ('650e8400-e29b-41d4-a716-446655440002', 'maria.garcia@example.com', '$2b$10$ZsUsL4RWfcTHgHYL6VvUTeKcwJlskyZg0LCgingIqfVSyxXNujSvy', 'María García', 3002345678, false, '2025-11-20 18:22:24.793899');
INSERT INTO public.user_entity VALUES ('650e8400-e29b-41d4-a716-446655440003', 'carlos.lopez@example.com', '$2b$10$7E2H.otd3GkyIJ1gOxEyQOEQojluYRb/VGEA303TQA1CMrpon7eV6', 'Carlos López', 3003456789, true, '2025-11-20 18:22:24.793899');
INSERT INTO public.user_entity VALUES ('650e8400-e29b-41d4-a716-446655440004', 'ana.martinez@example.com', '$2b$10$yCEtvPizx6MYE4HsEiA/6.wL6/GQeIFusiw2bHQ/6R/k1Ye8WxM2K', 'Ana Martínez', 3004567890, false, '2025-11-20 18:22:24.793899');
INSERT INTO public.user_entity VALUES ('650e8400-e29b-41d4-a716-446655440005', 'diego.rodriguez@example.com', '$2b$10$jWSaLglqx0andFMlaI2Zg.35McXVgF4uwA6rOvPz.m4cdDJoSyYOm', 'Diego Rodríguez', 3005678901, true, '2025-11-20 18:22:24.793899');


--
-- TOC entry 4936 (class 0 OID 34069)
-- Dependencies: 221
-- Data for Name: user_entity_roles_role_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_entity_roles_role_entity VALUES ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001');
INSERT INTO public.user_entity_roles_role_entity VALUES ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001');
INSERT INTO public.user_entity_roles_role_entity VALUES ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002');
INSERT INTO public.user_entity_roles_role_entity VALUES ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003');
INSERT INTO public.user_entity_roles_role_entity VALUES ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002');


--
-- TOC entry 4773 (class 2606 OID 34046)
-- Name: role_entity PK_7bc1bd2364b6e9bf7c84b1e52e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_entity
    ADD CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY (id);


--
-- TOC entry 4777 (class 2606 OID 34058)
-- Name: appointments_entity PK_8736ebfed4d8236b8a9bd2fa153; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments_entity
    ADD CONSTRAINT "PK_8736ebfed4d8236b8a9bd2fa153" PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 34073)
-- Name: user_entity_roles_role_entity PK_9426d726a48f9c5d9c83c6eb91f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity_roles_role_entity
    ADD CONSTRAINT "PK_9426d726a48f9c5d9c83c6eb91f" PRIMARY KEY ("userEntityId", "roleEntityId");


--
-- TOC entry 4779 (class 2606 OID 34068)
-- Name: user_entity PK_b54f8ea623b17094db7667d8206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 34048)
-- Name: role_entity UQ_a14649d05b3bf675ebabb5e3e44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_entity
    ADD CONSTRAINT "UQ_a14649d05b3bf675ebabb5e3e44" UNIQUE (role_name);


--
-- TOC entry 4780 (class 1259 OID 34074)
-- Name: IDX_3277e83a0656736e30b901d9a3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3277e83a0656736e30b901d9a3" ON public.user_entity_roles_role_entity USING btree ("userEntityId");


--
-- TOC entry 4781 (class 1259 OID 34075)
-- Name: IDX_63f06698e4071b610eca2da812; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_63f06698e4071b610eca2da812" ON public.user_entity_roles_role_entity USING btree ("roleEntityId");


--
-- TOC entry 4784 (class 2606 OID 34081)
-- Name: appointments_entity FK_247a4a9a6ff62dbb8a71831d02e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments_entity
    ADD CONSTRAINT "FK_247a4a9a6ff62dbb8a71831d02e" FOREIGN KEY ("doctorId") REFERENCES public.user_entity(id);


--
-- TOC entry 4786 (class 2606 OID 34086)
-- Name: user_entity_roles_role_entity FK_3277e83a0656736e30b901d9a30; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity_roles_role_entity
    ADD CONSTRAINT "FK_3277e83a0656736e30b901d9a30" FOREIGN KEY ("userEntityId") REFERENCES public.user_entity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4787 (class 2606 OID 34091)
-- Name: user_entity_roles_role_entity FK_63f06698e4071b610eca2da812c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity_roles_role_entity
    ADD CONSTRAINT "FK_63f06698e4071b610eca2da812c" FOREIGN KEY ("roleEntityId") REFERENCES public.role_entity(id);


--
-- TOC entry 4785 (class 2606 OID 34076)
-- Name: appointments_entity FK_b810bb14ef20baaa480471faaf4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments_entity
    ADD CONSTRAINT "FK_b810bb14ef20baaa480471faaf4" FOREIGN KEY ("userId") REFERENCES public.user_entity(id);


-- Completed on 2025-11-20 18:23:21

--
-- PostgreSQL database dump complete
--

