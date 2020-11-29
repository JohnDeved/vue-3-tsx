import { Vue } from "vue-class-component";

export class ClassComponent extends Vue {
    setup () {
        return () => <div>test</div>
    }
}